import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { Op } from 'sequelize'
import { RoomsModel, type RoomsAttributes } from '../../models/rooms'

export const updateRoom = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as RoomsAttributes

  const emptyField = requestChecker({
    requireList: ['roomId'],
    requestData: requestBody
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
        roomId: { [Op.eq]: requestBody.roomId }
      }
    })

    if (room === null) {
      const message = 'room not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const newData: RoomsAttributes | any = {
      ...(requestBody.roomName?.length > 0 && {
        roomName: requestBody.roomName
      }),
      ...(requestBody.roomId?.length > 0 && {
        roomId: requestBody.roomId
      }),
      ...(requestBody.roomBuildingId?.length > 0 && {
        roomBuildingId: requestBody.roomBuildingId
      })
    }

    await RoomsModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        roomId: { [Op.eq]: requestBody.roomId }
      }
    })

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
