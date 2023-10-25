/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { BuildingsModel } from './buildings'

export interface FloorsAttributes extends ZygoteAttributes {
  floorId: string
  floorName: string
  floorBuildingId: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type FloorsCreationAttributes = Optional<
  FloorsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface FloorsInstance
  extends Model<FloorsAttributes, FloorsCreationAttributes>,
    FloorsAttributes {}

export const FloorsModel = sequelize.define<FloorsInstance>(
  'floors',
  {
    ...ZygoteModel,
    floorId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    floorName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    floorBuildingId: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'floors',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB',
    hooks: {
      beforeCreate: (record, options) => {
        const now = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
        record.createdAt = now
        record.updatedAt = null
      },
      beforeUpdate: (record, options) => {
        const now = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
        record.updatedAt = now
      }
    }
  }
)

FloorsModel.hasOne(BuildingsModel, {
  as: 'buildings',
  sourceKey: 'floorBuildingId',
  foreignKey: 'buildingId'
})
