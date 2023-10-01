/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { BuildingsModel } from './buildings'

export interface RoomsAttributes extends ZygoteAttributes {
  roomId: string
  roomName: string
  roomBuildingId: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type RoomsCreationAttributes = Optional<RoomsAttributes, 'id' | 'createdAt' | 'updatedAt'>

// We need to declare an interface for our model that is basically what our class would be
interface RoomsInstance
  extends Model<RoomsAttributes, RoomsCreationAttributes>,
    RoomsAttributes {}

export const RoomsModel = sequelize.define<RoomsInstance>(
  'rooms',
  {
    ...ZygoteModel,
    roomId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    roomName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    roomBuildingId: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'rooms',
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

RoomsModel.hasOne(BuildingsModel, {
  as: 'building',
  sourceKey: 'roomBuildingId',
  foreignKey: 'buildingId'
})
