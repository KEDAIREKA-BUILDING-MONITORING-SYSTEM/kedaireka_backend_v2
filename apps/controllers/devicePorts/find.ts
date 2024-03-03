import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { type DevicePortsAttributes, DevicePortsModel } from '../../models/devicePorts'
import { requestChecker } from '../../utilities/requestCheker'

export const findAllDevicePort = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await DevicePortsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ devicePortName: { [Op.like]: `%${req.query.search}%` } }]
        }),
        ...(Boolean(req.query.devicePortDeviceId) && {
          devicePortDeviceId: { [Op.eq]: req.query?.devicePortDeviceId }
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
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findDetailDevicePort = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as DevicePortsAttributes

  const emptyField = requestChecker({
    requireList: ['devicePortId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const devicePort = await DevicePortsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortId: { [Op.eq]: requestParams.devicePortId }
      }
    })

    if (devicePort === null) {
      const message = 'device port not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = devicePort
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
