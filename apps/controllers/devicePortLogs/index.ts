import { createDevicePortLog } from '../iotDevices/createLogs'
import { findAllDevicePortLogs, findOneDevicePortLogs } from './find'

export const devicePortLogsController = {
  findAll: findAllDevicePortLogs,
  find: findOneDevicePortLogs,
  create: createDevicePortLog
}
