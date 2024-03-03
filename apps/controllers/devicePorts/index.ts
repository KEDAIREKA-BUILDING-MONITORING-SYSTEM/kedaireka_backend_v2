import { createDevicePort } from './create'
import { findAllDevicePort, findDetailDevicePort } from './find'
import { removeDevicePort } from './remove'
import { updateDevicePort } from './update'

export const devicePortController = {
  findAll: findAllDevicePort,
  findDetial: findDetailDevicePort,
  create: createDevicePort,
  update: updateDevicePort,
  remove: removeDevicePort
}
