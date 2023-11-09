import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { DeviceModel } from '../../models/devices'
import { v4 as uuidv4 } from 'uuid'
import {
  DevicePortLogsModel,
  type DevicePortLogsAttributes
} from '../../models/devicePortLogs'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { DevicePortsModel } from '../../models/devicePorts'

export const createDevicePortLog = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DevicePortLogsAttributes
  const emptyField = requestChecker({
    requireList: ['devicePortLogValue', 'devicePortLogPortNumber', 'x-device-token'],
    requestData: { ...requestBody, ...req.headers }
  })

  console.log(requestBody)

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

    const devicePort = await DevicePortsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortNumber: requestBody.devicePortLogPortNumber,
        devicePortDeviceId: device.deviceId
      },
      attributes: [
        'devicePortName',
        'devicePortCategory',
        'devicePortNumber',
        'devicePortStatus'
      ]
    })

    if (devicePort === null) {
      const message = `device port ${requestBody.devicePortLogPortNumber} not registered`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    console.log(devicePort.dataValues)

    requestBody.devicePortLogCategory = devicePort.devicePortCategory
    requestBody.devicePortLogName = devicePort.devicePortName
    requestBody.devicePortLogDeviceId = device.deviceId
    requestBody.devicePortLogId = uuidv4()
    await DevicePortLogsModel.create(requestBody)

    const response = ResponseData.default
    const result = devicePort
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
