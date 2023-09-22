// import type { Request, Response } from 'express'
// import { StatusCodes } from 'http-status-codes'
// import { Op } from 'sequelize'
// import moment from 'moment'

// import { type DeviceAttributes, DeviceModel } from '../../models/device'
// import { ResponseData } from '../../utilities/response'
// import { requestChecker } from '../../utilities/requestCheker'

// interface DeviceQuery extends DeviceAttributes {
//   from: string
//   to: string
// }

// export const statisticDevice = async (req: Request, res: Response): Promise<any> => {
//   const query = req.query as unknown as DeviceQuery
//   const emptyField = requestChecker({
//     requireList: ['deviceId'],
//     requestData: query
//   })

//   if (emptyField.length > 0) {
//     const message = `invalid request parameter! require (${emptyField})`
//     const response = ResponseData.error(message)
//     return res.status(StatusCodes.BAD_REQUEST).json(response)
//   }

//   try {
//     const result = await DeviceModel.findAll({
//       where: {
//         deleted: { [Op.eq]: 0 },
//         ...(Boolean(query.deviceId)
//           ? { deviceId: { [Op.eq]: query.deviceId } }
//           : { deviceId: { [Op.not]: null } }),
//         ...(Boolean(query.deviceType)
//           ? { deviceType: { [Op.eq]: query.deviceType } }
//           : { deviceType: { [Op.eq]: 'dht' } }),
//         ...(Boolean(query.deviceCategory)
//           ? { deviceCategory: { [Op.eq]: query.deviceCategory } }
//           : { deviceCategory: { [Op.eq]: 'input' } }),
//         ...(Boolean(query.from) && Boolean(query.to)
//           ? {
//               createdAt: {
//                 [Op.between]: [moment(query.from).toDate(), moment(query.to).toDate()]
//               }
//             }
//           : Boolean(query.from)
//           ? {
//               createdAt: {
//                 [Op.between]: [
//                   moment(query.from).toDate(),
//                   moment().endOf('day').toDate()
//                 ]
//               }
//             }
//           : Boolean(query.to)
//           ? {
//               createdAt: {
//                 [Op.between]: [
//                   moment().startOf('day').toDate(),
//                   moment(query.to).toDate()
//                 ]
//               }
//             }
//           : {
//               createdAt: {
//                 [Op.between]: [
//                   moment().startOf('day').toDate(),
//                   moment().endOf('day').toDate()
//                 ]
//               }
//             })
//       }
//     })

//     if (result == null) {
//       const message = 'not found!'
//       const response = ResponseData.error(message)
//       return res.status(StatusCodes.NOT_FOUND).json(response)
//     }

//     const response = ResponseData.default
//     response.data = result
//     return res.status(StatusCodes.OK).json(response)
//   } catch (error: any) {
//     const message = `unable to process request! error ${error.message}`
//     const response = ResponseData.error(message)
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
//   }
// }
