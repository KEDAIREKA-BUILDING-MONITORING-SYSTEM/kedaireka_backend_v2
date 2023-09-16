/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DeviceAttributes extends ZygoteAttributes {
  deviceId: string
  deviceName: string
  deviceType: 'dht' | 'mq2'
  deviceCategory: 'input' | 'output'
  deviceValue: string
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
      type: DataTypes.ENUM('dht', 'mq2'),
      allowNull: false
    },
    deviceCategory: {
      type: DataTypes.ENUM('input', 'output'),
      allowNull: false
    },
    deviceValue: {
      type: DataTypes.JSON,
      allowNull: false
    }
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
