/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { roomController } from '../../controllers/rooms'

export const roomRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/rooms', route)

  route.get(
    '/list',
    async (req: Request, res: Response) => await roomController.findAll(req, res)
  )
  route.get(
    '/detail/:roomId',
    async (req: Request, res: Response) => await roomController.findDetail(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await roomController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await roomController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await roomController.remove(req, res)
  )
}
