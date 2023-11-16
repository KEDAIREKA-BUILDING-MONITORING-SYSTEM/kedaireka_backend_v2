import { current } from './current'
import { statistic } from './statistic'

export const statisticController = {
  findAll: statistic,
  getCurrent: current
}
