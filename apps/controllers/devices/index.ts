import { createDevice } from './create'
import { findAllDevice, findOneDevice } from './find'
import { removeDevice } from './remove'
import { updateDevice, updateDeviceToken } from './update'

export const deviceController = {
  create: createDevice,
  findAll: findAllDevice,
  findOne: findOneDevice,
  remove: removeDevice,
  update: updateDevice,
  updateToken: updateDeviceToken
}
