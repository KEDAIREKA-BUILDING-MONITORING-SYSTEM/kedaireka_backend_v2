import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { DevicePortsModel } from '../../models/devicePorts'

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
