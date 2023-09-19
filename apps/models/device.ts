/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DeviceAttributes extends ZygoteAttributes {
  deviceId: string
  deviceName: string
  deviceType: string
  deviceCategory: string
  deviceBuilding: string
  deviceRoom: number
  deviceStatus: number
  deviceToken: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DeviceCreationAttributes = Optional<
  DeviceAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface DeviceInstance
  extends Model<DeviceAttributes, DeviceCreationAttributes>,
    DeviceAttributes {}

export const DeviceModel = sequelize.define<DeviceInstance>(
  'device',
  {
    ...ZygoteModel,
    deviceId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceType: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    deviceCategory: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    deviceBuilding: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceRoom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true ,
      defaultValue: 0
    },
    deviceToken: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device',
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
