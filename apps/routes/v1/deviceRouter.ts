/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { deviceController } from '../../controllers/device'
import { deviceLogController } from '../../controllers/deviceLog'

export const deviceRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/devices', route)

  route.get(
    '/list',
    async (req: Request, res: Response) => await deviceController.findAll(req, res)
  )
  route.get(
    '/statistic',
    async (req: Request, res: Response) => await deviceController.statistic(req, res)
  )
  route.get(
    '/detail/:deviceId',
    async (req: Request, res: Response) => await deviceController.findOne(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await deviceController.createDevice(req, res)
  )
  route.post(
    '/sensors',
    async (req: Request, res: Response) => await deviceController.createSensor(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await deviceController.update(req, res)
  )
  route.patch(
    '/token',
    async (req: Request, res: Response) => await deviceController.updateToken(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await deviceController.remove(req, res)
  )

  route.get(
    '/logs/:deviceId',
    async (req: Request, res: Response) => await deviceLogController.find(req, res)
  )

  route.post(
    '/logs',
    async (req: Request, res: Response) => await deviceLogController.create(req, res)
  )
}
