import { createDevice } from './create'
import { findAllAllDevice, findOneDevice } from './find'
import { removeDevice } from './remove'
import { updateDevice, updateDeviceToken } from './update'

export const deviceController = {
  create: createDevice,
  findAll: findAllAllDevice,
  findOne: findOneDevice,
  remove: removeDevice,
  update: updateDevice,
  updateToken: updateDeviceToken
}
