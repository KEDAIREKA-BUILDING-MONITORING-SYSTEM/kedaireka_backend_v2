/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { importLayoutController } from '../../controllers/layout/import'

export const layoutRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/layouts', route)
  route.post(
    '/import',
    async (req: Request, res: Response) => await importLayoutController.import(req, res)
  )
}
