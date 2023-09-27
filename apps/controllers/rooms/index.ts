import { createRoom } from './create'
import { findAllAllRooms, findDetailRoom } from './find'
import { removeRoom } from './remove'
import { updateRoom } from './update'

export const roomController = {
  create: createRoom,
  findAll: findAllAllRooms,
  findDetail: findDetailRoom,
  remove: removeRoom,
  update: updateRoom
}
