import { createDevice } from './create'
import { findAllCrudExample, findOneCrudExample } from './find'
import { removeCrudExample } from './remove'
import { updateCrudExample } from './update'

export const deviceController = {
  create: createDevice,
  // findAll: findAllCrudExample,
  // findOne: findOneCrudExample,
  // remove: removeCrudExample,
  // update: updateCrudExample
}
