import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { FloorsModel, type FloorsAttributes } from '../../models/floor'

export const removeFloor = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as FloorsAttributes
  const emptyField = requestChecker({
    requireList: ['floorId'],
    requestData: requestQuery
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const floor = await FloorsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        floorId: { [Op.eq]: requestQuery.floorId }
      }
    })

    if (floor === null) {
      const message = 'floor not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    floor.deleted = 1
    void floor.save()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
