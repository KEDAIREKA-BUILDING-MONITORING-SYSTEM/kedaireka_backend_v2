import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { DeviceModel, type DeviceAttributes } from '../../models/device'

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
    const result = await DeviceModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceId: { [Op.eq]: requestBody.deviceId }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: DeviceAttributes | any = {
      ...(requestBody.deviceName.length > 0 && {
        deviceName: requestBody.deviceName
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
