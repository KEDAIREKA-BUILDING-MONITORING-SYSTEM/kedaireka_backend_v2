import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { DevicePortsModel, type DevicePortsAttributes } from '../../models/devicePorts'
import { Op } from 'sequelize'

export const updateDevicePort = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DevicePortsAttributes

  const emptyField = requestChecker({
    requireList: ['devicePortDeviceId', 'devicePortNumber'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const deviceSensor = await DevicePortsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortDeviceId: { [Op.eq]: requestBody.devicePortDeviceId },
        devicePortNumber: { [Op.eq]: requestBody.devicePortNumber }
      }
    })

    if (deviceSensor === null) {
      const message = 'device port not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    deviceSensor.devicePortStatus = requestBody.devicePortStatus
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
