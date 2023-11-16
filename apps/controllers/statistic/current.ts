import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { DevicePortLogsModel } from '../../models/devicePortLogs'

export const current = async (req: any, res: Response): Promise<any> => {
  try {
    const response = ResponseData.default
    const current = await DevicePortLogsModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogName: { [Op.eq]: 'ARUS' }
      }
    })

    let totalCurrent = 0

    current.forEach((value) => {
      totalCurrent += value.devicePortLogValue
    })

    response.data = { totalCurrent }

    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
