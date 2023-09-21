import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { DeviceModel } from '../../models/devices'

export const deviceStatistic = async (req: any, res: Response): Promise<any> => {
  try {
    const totalDevice = await DeviceModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const response = ResponseData.default
    response.data = {
      totalDevice
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
