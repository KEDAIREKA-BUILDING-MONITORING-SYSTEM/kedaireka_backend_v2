import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import { DeviceLogModel } from '../../models/deviceLogs'
import { type DeviceAttributes, DeviceModel } from '../../models/devices'

export const findAllAllDeviceLog = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await DeviceLogModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
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

export const findDeviceLogs = async (req: any, res: Response): Promise<any> => {
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
    const result = await DeviceModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceId: { [Op.eq]: requestParams.deviceId }
      },
      include: [
        {
          model: DeviceLogModel,
          attributes: ['createdAt', 'deviceLogId', 'deviceLogDeviceId', 'deviceLogValue'],
          as: 'deviceLogs'
        }
      ]
    })

    if (result == null) {
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