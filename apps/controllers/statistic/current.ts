import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { DevicePortLogsModel } from '../../models/devicePortLogs'
import { Pagination } from '../../utilities/pagination'

export const totalCurrentConsumption = async (req: any, res: Response): Promise<any> => {
  try {
    const response = ResponseData.default
    const current = await DevicePortLogsModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogName: { [Op.eq]: 'ARUS' }
      }
    })

    let totalCurrent = 0

    current.forEach((value) => {
      totalCurrent += value.devicePortLogValue
    })

    response.data = totalCurrent

    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const allCurrentConsumption = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await DevicePortLogsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogName: { [Op.eq]: 'ARUS' },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ reportMessage: { [Op.like]: `%${req.query.search}%` } }]
        }),
        ...(Boolean(req.query.httpStatusCode) && {
          [Op.or]: [
            { reportHttpStatusCode: { [Op.like]: `%${req.query.httpStatusCode}%` } }
          ]
        })
      },
      // order: [['id', 'desc']],
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
