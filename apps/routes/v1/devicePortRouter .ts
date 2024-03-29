/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { devicePortController } from '../../controllers/devicePorts'

export const devicePortRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/devices/ports', route)
  route.get(
    '/',
    async (req: Request, res: Response) => await devicePortController.findAll(req, res)
  )
  route.get(
    '/detail/:devicePortId',
    async (req: Request, res: Response) => await devicePortController.findDetial(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await devicePortController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await devicePortController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await devicePortController.remove(req, res)
  )
}
