import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { RoomsModel, type RoomsAttributes } from '../../models/rooms'

export const removeRoom = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as RoomsAttributes

  const emptyField = requestChecker({
    requireList: ['roomId'],
    requestData: requestQuery
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const room = await RoomsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        roomId: { [Op.eq]: requestQuery.roomId }
      }
    })

    if (room === null) {
      const message = 'room not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    room.deleted = 1
    void room.save()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
