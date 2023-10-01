import { createRoom } from './create'
import { findAllRooms, findDetailRoom } from './find'
import { removeRoom } from './remove'
import { updateRoom } from './update'

export const roomController = {
  create: createRoom,
  findAll: findAllRooms,
  findDetail: findDetailRoom,
  remove: removeRoom,
  update: updateRoom
}
