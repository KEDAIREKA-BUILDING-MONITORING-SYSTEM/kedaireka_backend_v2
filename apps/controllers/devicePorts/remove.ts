import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { DevicePortsModel, type DevicePortsAttributes } from '../../models/devicePorts'

export const removeDevicePort = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as DevicePortsAttributes
  const emptyField = requestChecker({
    requireList: ['devicePortId'],
    requestData: requestQuery
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  console.log(requestQuery)

  try {
    const port = await DevicePortsModel.findOne({
      where: {
        devicePortId: { [Op.eq]: requestQuery.devicePortId }
      }
    })

    if (port === null) {
      const message = 'device port not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    void port.destroy()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
