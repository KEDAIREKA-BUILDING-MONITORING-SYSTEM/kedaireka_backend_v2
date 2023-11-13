import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import { type DeviceAttributes, DeviceModel } from '../../models/devices'
import { DevicePortLogsModel } from '../../models/devicePortLogs'
import { DevicePortsModel } from '../../models/devicePorts'
import { BuildingsModel } from '../../models/buildings'
import { RoomsModel } from '../../models/rooms'

export const findAllDevice = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await DeviceModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ deviceName: { [Op.like]: `%${req.query.search}%` } }]
        }),
        ...(Boolean(req.query.deviceStatus) && {
          deviceStatus: { [Op.eq]: req.query.deviceStatus }
        }),
        ...(Boolean(req.query.deviceFloor) && {
          deviceFloor: { [Op.eq]: parseInt(req.query.deviceFloor) }
        }),
        ...(Boolean(req.query.deviceRoomId) && {
          deviceRoomId: { [Op.eq]: req.query.deviceRoomId }
        }),
        ...(Boolean(req.query.deviceBuildingId) && {
          deviceBuildingId: { [Op.eq]: req.query.deviceBuildingId }
        })
      },
      attributes: [
        'createdAt',
        'updatedAt',
        'deviceStatus',
        'deviceId',
        'deviceName',
        'deviceFloor',
        'deviceToken'
      ],
      include: [
        {
          model: BuildingsModel,
          as: 'building',
          attributes: ['buildingId', 'buildingName']
        },
        {
          model: RoomsModel,
          as: 'room',
          attributes: ['roomId', 'roomName']
        }
      ],
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
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findOneDevice = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as DeviceAttributes

  const emptyField = requestChecker({
    requireList: ['deviceId'],
    requestData: requestParams
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
        deviceId: { [Op.eq]: requestParams.deviceId }
      },
      include: [
        {
          model: DevicePortLogsModel,
          attributes: [
            'createdAt',
            'devicePortLogId',
            'devicePortLogDeviceId',
            'devicePortLogValue',
            'devicePortLogName',
            'devicePortLogPortNumber'
          ],
          as: 'devicePortLogs'
        },
        {
          model: DevicePortsModel,
          // where: {
          //   deleted: { [Op.eq]: 0 }
          // },
          attributes: [
            'createdAt',
            'devicePortId',
            'devicePortDeviceId',
            'devicePortName',
            'devicePortCategory',
            'devicePortNumber',
            'devicePortStatus'
          ],
          as: 'devicePorts'
        },
        {
          model: BuildingsModel,
          as: 'building',
          attributes: ['buildingId', 'buildingName']
        },
        {
          model: RoomsModel,
          as: 'room',
          attributes: ['roomId', 'roomName']
        }
      ]
    })

    if (result == null) {
      const message = 'device not found!'
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
