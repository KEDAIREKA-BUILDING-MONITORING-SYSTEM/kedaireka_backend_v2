import { findMyProfile } from './find'
import { loginMyProfile } from './login'
import { updateMyProfile } from './update'

export const myProfileController = {
  find: findMyProfile,
  update: updateMyProfile,
  login: loginMyProfile
}
