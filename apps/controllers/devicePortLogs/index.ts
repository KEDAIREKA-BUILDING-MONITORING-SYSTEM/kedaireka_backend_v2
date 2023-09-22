import { createDevicePortLog } from './create'
import { findAllAllDevicePortLogs, findOneDevicePortLogs } from './find'

export const devicePortLogsController = {
  findAll: findAllAllDevicePortLogs,
  find: findOneDevicePortLogs,
  create: createDevicePortLog
}
