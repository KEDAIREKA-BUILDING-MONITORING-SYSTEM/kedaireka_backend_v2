import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { DeviceModel, type DeviceAttributes } from '../../models/devices'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'

export const createDevice = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as DeviceAttributes

  const emptyField = requestChecker({
    requireList: ['deviceName', 'deviceBuildingId', 'deviceRoomId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    requestBody.deviceId = uuidv4()
    requestBody.deviceToken = uuidv4()
    await DeviceModel.create(requestBody)

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
