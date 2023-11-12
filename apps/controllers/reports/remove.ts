import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { type ReportAttributes, ReportModel } from '../../models/reports'

export const removeReport = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as ReportAttributes

  const emptyField = requestChecker({
    requireList: ['reportId'],
    requestData: requestQuery
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
        reportId: { [Op.eq]: requestQuery.reportId }
      }
    })

    if (report === null) {
      const message = 'report not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    report.deleted = 1
    void report.save()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
