import { createDevicePort } from './create'
import { findAllDevicePort } from './find'
import { removeDevicePort } from './remove'
import { updateDevicePort } from './update'

export const devicePortController = {
  findAll: findAllDevicePort,
  create: createDevicePort,
  update: updateDevicePort,
  remove: removeDevicePort
}
