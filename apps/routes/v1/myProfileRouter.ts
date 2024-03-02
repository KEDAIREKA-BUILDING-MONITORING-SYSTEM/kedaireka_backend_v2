/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import express, { type Express, type Request, type Response } from 'express'
import { myProfileController } from '../../controllers/my-profile'
import { middleware } from '../../middlewares'

export const myProfileRouter = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/my-profile', router)
  router.get(
    '/',
    middleware.useAuthorization,
    async (req: Request, res: Response) => await myProfileController.find(req, res)
  )
  router.patch(
    '/',
    middleware.useAuthorization,
    async (req: Request, res: Response) => await myProfileController.update(req, res)
  )
  router.post(
    '/login',
    async (req: Request, res: Response) => await myProfileController.login(req, res)
  )
}
