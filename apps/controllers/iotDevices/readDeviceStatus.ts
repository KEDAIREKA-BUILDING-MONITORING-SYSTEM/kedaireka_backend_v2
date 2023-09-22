import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { DeviceModel } from '../../models/devices'
import { DevicePortsModel } from '../../models/devicePorts'

export const iotDeviceReadStatus = async (req: any, res: Response): Promise<any> => {
  const emptyField = requestChecker({
    requireList: ['x-device-token'],
    requestData: req.headers
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

    const devicePorts = await DevicePortsModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortDeviceId: { [Op.eq]: device?.deviceId }
      },
      attributes: ['deviceSensorPort', 'deviceSensorStatus']
    })

    if (devicePorts === null) {
      const message = 'device port not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = devicePorts
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
