import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { Op } from 'sequelize'
import { BuildingsModel, type BuildingsAttributes } from '../../models/buildings'

export const updateBuilding = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as BuildingsAttributes

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
    const building = await BuildingsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        buildingId: { [Op.eq]: requestBody.buildingId }
      }
    })

    if (building === null) {
      const message = 'building not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const newData: BuildingsAttributes | any = {
      ...(requestBody.buildingName?.length > 0 && {
        buildingName: requestBody.buildingName
      })
    }

    await BuildingsModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        buildingId: { [Op.eq]: requestBody.buildingId }
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
