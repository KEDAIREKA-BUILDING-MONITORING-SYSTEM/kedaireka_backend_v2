import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { BuildingsModel, type BuildingsAttributes } from '../../models/buildings'

export const removeBuilding = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as BuildingsAttributes

  const emptyField = requestChecker({
    requireList: ['buildingId'],
    requestData: requestQuery
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
        buildingId: { [Op.eq]: requestQuery.buildingId }
      }
    })

    if (building == null) {
      const message = 'building not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    building.deleted = 1
    void building.save()

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
