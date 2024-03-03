/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { settingController } from '../../controllers/settings'

export const settingRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/settings', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await settingController.findAll(req, res)
  )
  route.get(
    '/detail/:buildingId',
    async (req: Request, res: Response) => await settingController.findDetail(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await settingController.create(req, res)
  )
  route.patch(
    '/',
    async (req: Request, res: Response) => await settingController.update(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await settingController.remove(req, res)
  )
}
