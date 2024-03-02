import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { DeviceModel, type DeviceAttributes } from '../../models/devices'
import { v4 as uuidv4 } from 'uuid'

export const updateDevice = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DeviceAttributes

  const emptyField = requestChecker({
    requireList: ['deviceId'],
    requestData: requestBody
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
        deviceId: { [Op.eq]: requestBody.deviceId }
      }
    })

    if (device == null) {
      const message = 'device not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: DeviceAttributes | any = {
      ...(requestBody.deviceName?.length > 0 && {
        deviceName: requestBody.deviceName
      }),
      ...(requestBody.deviceRoomId?.length > 0 && {
        deviceRoomId: requestBody.deviceRoomId
      }),
      ...(requestBody.deviceBuildingId?.length > 0 && {
        deviceBuildingId: requestBody.deviceBuildingId
      }),
      ...(requestBody.deviceFloorId?.length > 0 && {
        deviceFloor: requestBody.deviceFloorId
      }),
      ...(requestBody.deviceStatus?.length > 0 && {
        deviceStatus: requestBody.deviceStatus
      })
    }

    await DeviceModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        deviceId: { [Op.eq]: requestBody.deviceId }
      }
    })

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const updateDeviceToken = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DeviceAttributes

  const emptyField = requestChecker({
    requireList: ['deviceId'],
    requestData: requestBody
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
        deviceId: { [Op.eq]: requestBody.deviceId }
      }
    })

    if (device == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    device.deviceToken = uuidv4()
    void device.save()
    const response = ResponseData.default
    response.data = { token: device.deviceToken }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
