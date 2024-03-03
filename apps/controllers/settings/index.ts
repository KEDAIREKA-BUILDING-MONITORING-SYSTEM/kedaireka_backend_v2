import { createBuilding } from './create'
import { findAllSetting, findBuildingDetail } from './find'
import { removeBuilding } from './remove'
import { updateBuilding } from './update'

export const settingController = {
  create: createBuilding,
  findAll: findAllSetting,
  findDetail: findBuildingDetail,
  remove: removeBuilding,
  update: updateBuilding
}
