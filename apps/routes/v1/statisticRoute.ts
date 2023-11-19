/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { statisticController } from '../../controllers/statistic'

export const statisticRouter = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/statistic', middleware.useAuthorization, router)
  router.get(
    '/',
    async (req: Request, res: Response) => await statisticController.findAll(req, res)
  )
  router.get(
    '/current-consumption/total',
    async (req: Request, res: Response) =>
      await statisticController.totalCurrentConsumption(req, res)
  )
  router.get(
    '/current-consumption/list',
    async (req: Request, res: Response) =>
      await statisticController.allCurrentConsumption(req, res)
  )
}
