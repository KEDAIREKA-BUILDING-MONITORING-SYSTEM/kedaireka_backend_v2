import { createDevice } from './createDevice'
import { createDeviceSensor } from './createSensor'
import { findAllAllDevice, findOneDevice } from './find'
import { updateDevice, updateDeviceToken } from './update'
import { statisticDevice } from './statistic'

export const deviceController = {
  createDevice,
  findAll: findAllAllDevice,
  findOne: findOneDevice,
  statistic: statisticDevice,
  remove: removeDevice,
  update: updateDevice,
  createSensor: createDeviceSensor,
  updateToken: updateDeviceToken
}
