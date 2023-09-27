import { createBuilding } from './create'
import { findAllAllBuildings, findBuildingDetail } from './find'
import { removeBuilding } from './remove'
import { updateBuilding } from './update'

export const buildingController = {
  create: createBuilding,
  findAll: findAllAllBuildings,
  findDetail: findBuildingDetail,
  remove: removeBuilding,
  update: updateBuilding
}
