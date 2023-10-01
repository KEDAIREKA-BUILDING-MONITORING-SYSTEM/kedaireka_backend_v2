import { createAdmin } from './creat'
import { findAllAdmin, findOneAdmin } from './find'
import { loginAdmin } from './login'
import { removeAdmin } from './remove'
import { updateAdmin } from './update'

export const adminController = {
  find: findOneAdmin,
  findAll: findAllAdmin,
  create: createAdmin,
  login: loginAdmin,
  remove: removeAdmin,
  update: updateAdmin
}
