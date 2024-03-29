import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { CONSOLE } from '../../utilities/log'
import { RoomsModel } from '../../models/rooms'
import { requestChecker } from '../../utilities/requestCheker'
import { BuildingsModel } from '../../models/buildings'
import { FloorsModel } from '../../models/floor'

export const findAllRooms = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await RoomsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ roomName: { [Op.like]: `%${req.query.search}%` } }]
        }),
        ...(Boolean(req.query.buildingId) && {
          roomBuildingId: { [Op.eq]: req.query.buildingId }
        }),
        ...(Boolean(req.query.floorId) && {
          roomFloorId: { [Op.eq]: req.query.floorId }
        })
      },
      include: [
        {
          model: BuildingsModel,
          as: 'building',
          attributes: ['buildingId', 'buildingName']
        },
        {
          model: FloorsModel,
          as: 'floor',
          attributes: ['floorId', 'floorName']
        }
      ],
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.default
    response.data = page.data(result)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findDetailRoom = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params
  const emptyField = requestChecker({
    requireList: ['roomBuildingId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const room = await RoomsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        roomBuildingId: { [Op.eq]: requestParams.roomBuildingId }
      },
      include: [
        {
          model: BuildingsModel,
          as: 'building',
          attributes: ['buildingId', 'buildingName']
        },
        {
          model: FloorsModel,
          as: 'floor',
          attributes: ['floorId', 'floorName']
        }
      ]
    })

    if (room == null) {
      const message = 'room not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = room
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
