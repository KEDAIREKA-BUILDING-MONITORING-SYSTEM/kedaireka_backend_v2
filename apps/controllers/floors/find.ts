import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { CONSOLE } from '../../utilities/log'
import { requestChecker } from '../../utilities/requestCheker'
import { BuildingsModel } from '../../models/buildings'
import { type FloorsAttributes, FloorsModel } from '../../models/floor'

export const findAllFloor = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )

    console.log(req.query)
    const result = await FloorsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ floorName: { [Op.like]: `%${req.query.search}%` } }]
        }),
        ...(Boolean(req.query.buildingId) && {
          floorBuildingId: { [Op.eq]: req.query.buildingId }
        })
      },
      include: [
        {
          model: BuildingsModel,
          as: 'building',
          attributes: ['buildingId', 'buildingName']
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

export const findDetailFloor = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as FloorsAttributes
  const emptyField = requestChecker({
    requireList: ['floorId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const room = await FloorsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        floorId: { [Op.eq]: requestParams.floorId }
      },
      include: [
        {
          model: BuildingsModel,
          as: 'building',
          attributes: ['buildingId', 'buildingName']
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
