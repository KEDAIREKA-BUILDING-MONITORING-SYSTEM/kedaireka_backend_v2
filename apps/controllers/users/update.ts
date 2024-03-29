import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { Op } from 'sequelize'
import { UserModel, type UserAttributes } from '../../models/user'
import { CONFIG } from '../../configs'

export const updateUser = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes
  const emptyField = requestChecker({
    requireList: ['userId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestBody.userId }
      }
    })

    if (user === null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    if ('userPassword' in requestBody) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      requestBody.userPassword = require('crypto')
        .createHash('sha1')
        .update(requestBody.userPassword + CONFIG.secret.passwordEncryption)
        .digest('hex')
    }

    const newData: UserAttributes | any = {
      ...(requestBody.userEmail?.length > 0 && {
        userEmail: requestBody.userEmail
      }),
      ...(requestBody.userPassword?.length > 0 && {
        userPassword: requestBody.userPassword
      }),
      ...(requestBody.userRole?.length > 0 && {
        userRole: requestBody.userRole
      })
    }

    await UserModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestBody.userId }
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
