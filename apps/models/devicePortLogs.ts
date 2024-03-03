/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DevicePortLogsAttributes extends ZygoteAttributes {
  devicePortLogId: string
  devicePortLogDeviceId: string
  devicePortLogValue: number
  devicePortLogName: string
  devicePortLogPortNumber: number
  devicePortLogCategory: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DevicePortLogsCreationAttributes = Optional<
  DevicePortLogsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface DevicePortLogsInstance
  extends Model<DevicePortLogsAttributes, DevicePortLogsCreationAttributes>,
    DevicePortLogsAttributes {}

export const DevicePortLogsModel = sequelize.define<DevicePortLogsInstance>(
  'device_port_logs',
  {
    ...ZygoteModel,
    devicePortLogId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    devicePortLogDeviceId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    devicePortLogValue: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    devicePortLogName: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    devicePortLogPortNumber: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    devicePortLogCategory: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device_port_logs',
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
