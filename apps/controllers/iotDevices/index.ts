import { createDevicePortLog } from './createLogs'
import { iotDeviceReadStatus } from './readDeviceStatus'

export const iotDeviceController = {
  readStatus: iotDeviceReadStatus,
  createLog: createDevicePortLog
}
