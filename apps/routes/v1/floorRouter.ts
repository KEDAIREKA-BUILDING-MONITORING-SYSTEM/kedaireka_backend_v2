/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { floorController } from '../../controllers/floors'

export const floorRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/floors', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await floorController.findAll(req, res)
  )
  route.get(
    '/detail/:floorId',
    async (req: Request, res: Response) => await floorController.findDetail(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await floorController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await floorController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await floorController.remove(req, res)
  )
}
