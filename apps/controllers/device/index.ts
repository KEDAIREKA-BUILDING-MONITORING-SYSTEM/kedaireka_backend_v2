import { createDevice } from './create'
import { findAllAllDevice, findOneDevice } from './find'
import { removeDevice } from './remove'
import { statisticDevice } from './statistic'
import { updateDevice } from './update'

export const deviceController = {
  create: createDevice,
  findAll: findAllAllDevice,
  findOne: findOneDevice,
  statistic: statisticDevice,
  remove: removeDevice,
  update: updateDevice
}
