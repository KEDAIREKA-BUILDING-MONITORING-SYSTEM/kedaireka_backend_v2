/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { buildingController } from '../../controllers/buildings'

export const buildingRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/buildings', route)

  route.get(
    '/list',
    async (req: Request, res: Response) => await buildingController.findAll(req, res)
  )
  route.get(
    '/detail/:buildingId',
    async (req: Request, res: Response) => await buildingController.findDetail(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await buildingController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await buildingController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await buildingController.remove(req, res)
  )
}
