import { createDevicePort } from './create'
import { removeDevicePort } from './remove'
import { updateDevicePort } from './update'

export const devicePortController = {
  create: createDevicePort,
  update: updateDevicePort,
  remove: removeDevicePort
}
