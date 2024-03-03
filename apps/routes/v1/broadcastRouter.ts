/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { broadcastController } from '../../controllers/broadcast'

export const broadcastRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/broadcast', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await broadcastController.findAll(req, res)
  )
  route.get(
    '/detail/:buildingId',
    async (req: Request, res: Response) => await broadcastController.findDetail(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await broadcastController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await broadcastController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await broadcastController.remove(req, res)
  )
}
