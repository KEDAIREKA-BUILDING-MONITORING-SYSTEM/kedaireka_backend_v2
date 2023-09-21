import { createDevice } from './createDevice'
import { createDeviceSensor } from '../devicePort/create'
import { findAllAllDevice, findOneDevice } from './find'
import { readDeviceStatus } from './readDeviceStatus'
import { removeDevice } from './remove'
import { updateDevice, updateDeviceToken } from './update'

export const deviceController = {
  createDevice,
  findAll: findAllAllDevice,
  findOne: findOneDevice,
  remove: removeDevice,
  update: updateDevice,
  createSensor: createDeviceSensor,
  updateToken: updateDeviceToken,
  deviceStatus: readDeviceStatus
}
