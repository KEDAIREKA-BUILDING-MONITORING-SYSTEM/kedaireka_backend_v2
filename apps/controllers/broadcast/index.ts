import { createBuilding } from './create'
import { findAllBroadcast, findBuildingDetail } from './find'
import { removeBuilding } from './remove'
import { updateBuilding } from './update'

export const broadcastController = {
  create: createBuilding,
  findAll: findAllBroadcast,
  findDetail: findBuildingDetail,
  remove: removeBuilding,
  update: updateBuilding
}
