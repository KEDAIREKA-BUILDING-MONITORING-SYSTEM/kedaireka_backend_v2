/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { devicePortLogsController } from '../../controllers/devicePortLogs'

export const devicePortLogRouter = (app: Express) => {
  const route = express.Router()
  app.use('/api/v1/', route)
  route.get(
    '/devices/:deviceId/ports/:portNumber/logs',
    async (req: Request, res: Response) =>
      await devicePortLogsController.findAll(req, res)
  )
}
