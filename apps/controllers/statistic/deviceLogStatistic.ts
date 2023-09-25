import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { DevicePortLogsModel } from '../../models/devicePortLogs'

export const devicePortLogStatistic = async (req: any, res: Response): Promise<any> => {
  const emptyField = requestChecker({
    requireList: ['deviceId'],
    requestData: req.params
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const logs = await DevicePortLogsModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 },
        devicePortLogDeviceId: { [Op.eq]: req.params.deviceId }
      },
      attributes: [
        'createdAt',
        'devicePortLogId',
        'devicePortLogDeviceId',
        'devicePortLogValue',
        'devicePortLogName',
        'devicePortLogPortNumber',
        'devicePortLogCategory'
      ]
    })

    const response = ResponseData.default
    response.data = logs

    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
