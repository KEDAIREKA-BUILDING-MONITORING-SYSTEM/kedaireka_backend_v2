import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import {
  DeviceSensorsModel,
  type DeviceSensorsAttributes
} from '../../models/deviceSensors'
import { Op } from 'sequelize'

export const updateDevicePort = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DeviceSensorsAttributes

  const emptyField = requestChecker({
    requireList: ['deviceSensorDeviceId', 'deviceSensorPort'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const deviceSensor = await DeviceSensorsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceSensorDeviceId: { [Op.eq]: requestBody.deviceSensorDeviceId },
        deviceSensorPort: { [Op.eq]: requestBody.deviceSensorPort }
      }
    })

    if (deviceSensor === null) {
      const message = 'device port not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    deviceSensor.deviceSensorStatus = requestBody.deviceSensorStatus
    await deviceSensor.save()

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
