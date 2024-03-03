import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { type BuildingsAttributes, BuildingsModel } from '../../models/buildings'
import { requestChecker } from '../../utilities/requestCheker'
import { SettingsModel } from '../../models/settings'

export const findAllSetting = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await SettingsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ settingName: { [Op.like]: `%${req.query.search}%` } }]
        })
      },
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
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findBuildingDetail = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as BuildingsAttributes

  const emptyField = requestChecker({
    requireList: ['buildingId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const building = await BuildingsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        buildingId: { [Op.eq]: requestParams.buildingId }
      }
    })

    if (building === null) {
      const message = 'building not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = building
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
