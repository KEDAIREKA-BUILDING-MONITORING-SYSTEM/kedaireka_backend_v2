import { findAllUser, findOneUser } from './find'
import { userLogin } from './login'
import { userRegister } from './register'

export const UsersController = {
  login: userLogin,
  register: userRegister,
  findAll: findAllUser,
  findOne: findOneUser
}
