/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DeviceLogAttributes extends ZygoteAttributes {
  deviceLogId: string
  deviceLogDeviceId: string
  deviceLogValue: string
  deviceLogSensorName: string
  deviceLogSensorCategory: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DeviceLogCreationAttributes = Optional<
  DeviceLogAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface DeviceLogInstance
  extends Model<DeviceLogAttributes, DeviceLogCreationAttributes>,
    DeviceLogAttributes {}

export const DeviceLogModel = sequelize.define<DeviceLogInstance>(
  'device_log',
  {
    ...ZygoteModel,
    deviceLogId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceLogDeviceId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceLogValue: {
      type: DataTypes.JSON,
      allowNull: false
    },
    deviceLogSensorName: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    deviceLogSensorCategory: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device_log',
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
