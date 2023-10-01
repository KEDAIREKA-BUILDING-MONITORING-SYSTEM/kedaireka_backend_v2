/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { iotDeviceController } from '../../controllers/iotDevices'

export const iotDeviceRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/devices', route)
  route.get(
    '/iot/status',
    async (req: Request, res: Response) => await iotDeviceController.readStatus(req, res)
  )
  route.post(
    '/iot/port/logs',
    async (req: Request, res: Response) => await iotDeviceController.createLog(req, res)
  )
}
