import { reportCreate } from './create'
import { findAllReport, findDetailReport } from './find'

export const reportController = {
  create: reportCreate,
  findAll: findAllReport,
  findDetail: findDetailReport
}
