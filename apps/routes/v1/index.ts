/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Express, type Request, type Response } from 'express'
import { index } from '../../controllers'
import { userRoutes } from './userRouter'
import { uploadFileRoutes } from './uploadFileRoute'
import { myProfileRouter } from './myProfileRouter'
import { deviceRouter } from './deviceRouter'
import { devicePortRouter } from './devicePortRouter '
import { statisticRouter } from './statisticRoute'
import { buildingRouter } from './buildingRouter'
import { roomRouter } from './roomRouter'
import { reportRouter } from './reportRouter'
import { devicePortLogRouter } from './devicePortLogsRouter'
import { floorRouter } from './floorRouter'
import { layoutRouter } from './layoutRouter'
import { deviceChartRouter } from './deviceChartRouter'

export const appRouterV1 = (app: Express) => {
  app.get('/api/v1', async (req: Request, res: Response) => await index(req, res))
  userRoutes(app)
  uploadFileRoutes(app)
  statisticRouter(app)
  myProfileRouter(app)
  deviceRouter(app)
  devicePortRouter(app)
  floorRouter(app)
  roomRouter(app)
  buildingRouter(app)
  reportRouter(app)
  devicePortLogRouter(app)
  layoutRouter(app)
  deviceChartRouter(app)
}
