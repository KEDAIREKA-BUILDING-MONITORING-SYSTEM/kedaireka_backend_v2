import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { CONSOLE } from '../../utilities/log'
import { requestChecker } from '../../utilities/requestCheker'
import { type ReportAttributes, ReportModel } from '../../models/reports'

export const findAllReport = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await ReportModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ reportMessage: { [Op.like]: `%${req.query.search}%` } }]
        }),
        ...(Boolean(req.query.httpStatusCode) && {
          [Op.or]: [
            { reportHttpStatusCode: { [Op.like]: `%${req.query.httpStatusCode}%` } }
          ]
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
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findDetailReport = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as ReportAttributes
  const emptyField = requestChecker({
    requireList: ['reportId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const report = await ReportModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        reportId: { [Op.eq]: requestParams.reportId }
      }
    })

    if (report == null) {
      const message = 'room not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = report
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
