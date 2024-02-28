/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { reportController } from '../../controllers/reports'

export const reportRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/reports', route)

  route.get(
    '/',
    async (req: Request, res: Response) => await reportController.findAll(req, res)
  )
  route.get(
    '/detail/:reportId',
    async (req: Request, res: Response) => await reportController.findDetail(req, res)
  )
  route.post(
    '/',
    async (req: Request, res: Response) => await reportController.create(req, res)
  )
  route.delete(
    '/',
    async (req: Request, res: Response) => await reportController.remove(req, res)
  )
}
