import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { Op } from 'sequelize'
import { FloorsModel, type FloorsAttributes } from '../../models/floor'

export const updateFLoor = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as FloorsAttributes

  const emptyField = requestChecker({
    requireList: ['buildingId'],
    requestData: requestBody
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
        floorId: { [Op.eq]: requestBody.floorId }
      }
    })

    if (floor === null) {
      const message = 'room not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const newData: FloorsAttributes | any = {
      ...(requestBody.floorName?.length > 0 && {
        floorName: requestBody.floorName
      }),
      ...(requestBody.floorBuildingId?.length > 0 && {
        floorBuildingId: requestBody.floorBuildingId
      })
    }

    await FloorsModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        floorId: { [Op.eq]: requestBody.floorId }
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
