import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../../utilities/response'
import { type BuildingsAttributes, BuildingsModel } from '../../../models/buildings'

export const importLayout = async (req: any, res: Response): Promise<any> => {
  try {
    console.log(req.body)
    const building = checkBuildingJsonFormat(req.body) as unknown as BuildingsAttributes[]
    await BuildingsModel.bulkCreate(building)
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

const checkBuildingJsonFormat = (layout: any[]): any => {
  try {
    const buildings = layout.map((item) => {
      return {
        buildingId: item.buildingId,
        buildingName: item.buildingName
      }
    })

    return buildings
  } catch (error: any) {
    throw Error("json format for building doesn't support")
  }
}
