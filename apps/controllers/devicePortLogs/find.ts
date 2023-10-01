import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import {
  type DevicePortLogsAttributes,
  DevicePortLogsModel
} from '../../models/devicePortLogs'
import { type DeviceAttributes } from '../../models/devices'

export const findAllDevicePortLogs = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as DevicePortLogsAttributes

  const emptyField = requestChecker({
    requireList: ['deviceId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )

    const result = await DevicePortLogsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogDeviceId: { [Op.eq]: requestParams.devicePortLogDeviceId },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ deviceName: { [Op.like]: `%${req.query.search}%` } }]
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

export const findOneDevicePortLogs = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as DeviceAttributes

  const emptyField = requestChecker({
    requireList: ['deviceId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await DevicePortLogsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogId: { [Op.eq]: requestParams.deviceId }
      },
      attributes: ['createdAt', 'deviceLogId', 'deviceLogDeviceId', 'deviceLogValue']
    })

    if (result === null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
