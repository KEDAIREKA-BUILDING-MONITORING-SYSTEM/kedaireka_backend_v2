import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import {
  type DevicePortLogsAttributes,
  DevicePortLogsModel
} from '../../models/devicePortLogs'
import { DevicePortsModel } from '../../models/devicePorts'

export const findAllDeviceChart = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )

    const devicePorts = await DevicePortsModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortDeviceId: { [Op.eq]: req.params.deviceId }
      },
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: 10,
        offset: page.offset
      })
    })

    const devicePortLogs = await DevicePortLogsModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogDeviceId: { [Op.eq]: req.params.deviceId }
      },
      order: [['id', 'desc']],
      limit: 15,
      offset: 0
    })

    const devicePortLog1 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 1)
      .map((item) => item.devicePortLogValue)

    const devicePortLogTimeStamp1 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 1)
      .map((item) => item.createdAt)

    const devicePortLog2 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 2)
      .map((item) => item.devicePortLogValue)

    const devicePortLogTimeStamp2 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 2)
      .map((item) => item.createdAt)

    const devicePortLog3 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 3)
      .map((item) => item.devicePortLogValue)

    const devicePortLogTimeStamp3 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 3)
      .map((item) => item.createdAt)

    const devicePortLog4 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 4)
      .map((item) => item.devicePortLogValue)

    const devicePortLogTimeStamp4 = devicePortLogs
      .filter((port) => port.devicePortLogPortNumber === 4)
      .map((item) => item.createdAt)

    const data = devicePorts.map((device) => {
      if (device.devicePortNumber === 1) {
        return {
          ...device.dataValues,
          deviceLogs: devicePortLog1,
          timeStamp: devicePortLogTimeStamp1
        }
      }
      if (device.devicePortNumber === 2) {
        return {
          ...device.dataValues,
          deviceLogs: devicePortLog2,
          timeStamp: devicePortLogTimeStamp2
        }
      }
      if (device.devicePortNumber === 3) {
        return {
          ...device.dataValues,
          deviceLogs: devicePortLog3,
          timeStamp: devicePortLogTimeStamp3
        }
      }
      if (device.devicePortNumber === 4) {
        return {
          ...device.dataValues,
          deviceLogs: devicePortLog4,
          timeStamp: devicePortLogTimeStamp4
        }
      }
      return device
    })

    const response = ResponseData.default
    response.data = data
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findOneDevicePortLogs = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as DevicePortLogsAttributes

  const emptyField = requestChecker({
    requireList: ['devicePortLogId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await DevicePortLogsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogId: { [Op.eq]: requestParams.devicePortLogId }
      },
      attributes: ['createdAt', 'deviceLogId', 'deviceLogDeviceId', 'deviceLogValue']
    })

    if (result === null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
