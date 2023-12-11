import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { DevicePortLogsModel } from '../../models/devicePortLogs'
import { Pagination } from '../../utilities/pagination'
import moment from 'moment'

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

    const TODAY_START = moment().startOf('day').toDate()
    const TODAY_END = moment().endOf('day').toDate()

    const WEEK_START = moment().startOf('week').toDate()
    const WEEK_END = moment().endOf('week').toDate()

    const MONTH_START = moment().startOf('month').toDate()
    const MONTH_END = moment().endOf('month').toDate()

    const YEAR_START = moment().startOf('year').toDate()
    const YEAR_END = moment().endOf('year').toDate()

    const YESTERDAY = moment().clone().subtract(1, 'day')
    const YESTERDAY_START = YESTERDAY.startOf('day').toDate()
    const YESTERDAY_END = YESTERDAY.endOf('day').toDate()

    const result = await DevicePortLogsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogName: { [Op.eq]: 'ARUS' },
        ...(req.query.range === 'today' && {
          createdAt: { [Op.between]: [TODAY_START, TODAY_END] }
        }),
        ...(req.query.range === 'yesterday' && {
          createdAt: {
            [Op.between]: [YESTERDAY_START, YESTERDAY_END]
          }
        }),
        ...(req.query.range === 'week' && {
          createdAt: { [Op.between]: [WEEK_START, WEEK_END] }
        }),
        ...(req.query.range === 'month' && {
          createdAt: { [Op.between]: [MONTH_START, MONTH_END] }
        }),
        ...(req.query.range === 'year' && {
          createdAt: { [Op.between]: [YEAR_START, YEAR_END] }
        }),
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
