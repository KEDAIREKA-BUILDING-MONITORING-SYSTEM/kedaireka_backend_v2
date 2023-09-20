import { createDeviceLog } from './create'
import { findDeviceLogs } from './find'

export const deviceLogController = {
  find: findDeviceLogs,
  create: createDeviceLog
}
