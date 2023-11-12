import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { DeviceModel } from '../../models/devices'
import { BuildingsModel } from '../../models/buildings'

export const statistic = async (req: any, res: Response): Promise<any> => {
  try {
    const totalBuilding = await BuildingsModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalDevice = await DeviceModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalActiveDevice = await DeviceModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceStatus: { [Op.eq]: 'active' }
      }
    })

    const totalStandByDevice = await DeviceModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceStatus: { [Op.eq]: 'standBy' }
      }
    })

    const totalInactiveDevice = await DeviceModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        deviceStatus: { [Op.eq]: 'inactive' }
      }
    })

    const response = ResponseData.default
    response.data = {
      totalBuilding,
      totalDevice,
      totalActiveDevice,
      totalStandByDevice,
      totalInactiveDevice
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
