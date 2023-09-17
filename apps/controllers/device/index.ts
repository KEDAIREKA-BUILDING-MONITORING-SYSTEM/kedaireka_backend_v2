import { createDevice } from './create'
import { findAllAllDevice, findOneDevice } from './find'
import { removeDevice } from './remove'
import { updateDevice } from './update'

export const deviceController = {
  create: createDevice,
  findAll: findAllAllDevice,
  findOne: findOneDevice,
  remove: removeDevice,
  update: updateDevice
}
