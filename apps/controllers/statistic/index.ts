import { totalCurrentConsumption, allCurrentConsumption } from './current'
import { statistic } from './statistic'

export const statisticController = {
  findAll: statistic,
  totalCurrentConsumption,
  allCurrentConsumption
}
