import { reportCreate } from './create'
import { findAllReport, findDetailReport } from './find'
import { removeReport } from './remove'

export const reportController = {
  create: reportCreate,
  findAll: findAllReport,
  findDetail: findDetailReport,
  remove: removeReport
}
