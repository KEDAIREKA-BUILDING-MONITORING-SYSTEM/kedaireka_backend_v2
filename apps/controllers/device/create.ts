import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'

export const createDevice = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body

  console.log(requestBody)

  // const emptyField = requestChecker({
  //   requireList: ['crudExampleName'],
  //   requestData: requestBody
  // })

  // if (emptyField.length > 0) {
  //   const message = `invalid request parameter! require (${emptyField})`
  //   const response = ResponseData.error(message)
  //   return res.status(StatusCodes.BAD_REQUEST).json(response)
  // }

  try {
    // requestBody.crudExampleId = uuidv4()
    // await CrudExampleModel.create(requestBody)

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
