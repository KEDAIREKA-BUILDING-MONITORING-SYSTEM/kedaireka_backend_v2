/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { deviceController } from '../../controllers/device'

export const deviceRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/devices', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await deviceController.create(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await deviceController.create(req, res)
  )
}
