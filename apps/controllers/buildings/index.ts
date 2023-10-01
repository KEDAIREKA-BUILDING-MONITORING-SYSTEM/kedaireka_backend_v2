import { createBuilding } from './create'
import { findAllBuildings, findBuildingDetail } from './find'
import { removeBuilding } from './remove'
import { updateBuilding } from './update'

export const buildingController = {
  create: createBuilding,
  findAll: findAllBuildings,
  findDetail: findBuildingDetail,
  remove: removeBuilding,
  update: updateBuilding
}
