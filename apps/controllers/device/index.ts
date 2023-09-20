import { createDevice } from './createDevice'
import { createDeviceSensor } from './createSensor'
import { findAllAllDevice, findOneDevice } from './find'
import { removeDevice } from './remove'
import { updateDevice, updateDeviceToken } from './update'

export const deviceController = {
  createDevice,
  findAll: findAllAllDevice,
  findOne: findOneDevice,
  remove: removeDevice,
  update: updateDevice,
  createSensor: createDeviceSensor,
  updateToken: updateDeviceToken
}
