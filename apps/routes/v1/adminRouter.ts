/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { adminController } from '../../controllers/admin'

export const adminRouter = (app: Express): void => {
  const router = express.Router()
  app.use('/api/v1/admin', middleware.useAuthorization, router)
  router.get(
    '/',
    async (req: Request, res: Response) => await adminController.findAll(req, res)
  )
  router.get(
    '/detail/:adminId',
    async (req: Request, res: Response) => await adminController.find(req, res)
  )
  router.post(
    '/login',
    async (req: Request, res: Response) => await adminController.login(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await adminController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await adminController.update(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await adminController.remove(req, res)
  )
}
