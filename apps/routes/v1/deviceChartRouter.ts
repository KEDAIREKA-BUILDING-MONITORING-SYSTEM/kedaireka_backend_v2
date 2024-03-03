/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { deviceChartController } from '../../controllers/deviceChart'

export const deviceChartRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/', route)
  route.get(
    '/devices/charts/:deviceId',
    async (req: Request, res: Response) => await deviceChartController.findAll(req, res)
  )
}
