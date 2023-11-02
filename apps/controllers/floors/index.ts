import { createFloor } from './create'
import { findAllFloor, findDetailFloor } from './find'
import { removeFloor } from './remove'
import { updateFLoor } from './update'

export const floorController = {
  create: createFloor,
  findAll: findAllFloor,
  findDetail: findDetailFloor,
  remove: removeFloor,
  update: updateFLoor
}
