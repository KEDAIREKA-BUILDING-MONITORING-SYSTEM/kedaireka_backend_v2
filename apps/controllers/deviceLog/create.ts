import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { DeviceModel } from '../../models/devices'
import { v4 as uuidv4 } from 'uuid'
import { DeviceLogModel, type DeviceLogAttributes } from '../../models/deviceLogs'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'

export const createDeviceLog = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DeviceLogAttributes
  const emptyField = requestChecker({
    requireList: [
      'deviceLogValue',
      'deviceLogSensorName',
      'deviceLogSensorCategory',
      'x-device-token'
    ],
    requestData: { ...requestBody, ...req.headers }
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const device = await DeviceModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceToken: { [Op.eq]: req.header('x-device-token') }
      }
    })

    if (device === null) {
      const message = 'device not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    requestBody.deviceLogDeviceId = device.deviceId
    requestBody.deviceLogId = uuidv4()
    await DeviceLogModel.create(requestBody)

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
