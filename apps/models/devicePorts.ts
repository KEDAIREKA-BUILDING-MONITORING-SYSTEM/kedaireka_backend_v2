/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DevicePortsAttributes extends ZygoteAttributes {
  devicePortId: string
  devicePortDeviceId: string
  devicePortName: string
  devicePortCategory: string
  devicePortNumber: number
  devicePortStatus: boolean
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DevicePortsCreationAttributes = Optional<
  DevicePortsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface DevicePortsInstance
  extends Model<DevicePortsAttributes, DevicePortsCreationAttributes>,
    DevicePortsAttributes {}

export const DevicePortsModel = sequelize.define<DevicePortsInstance>(
  'device_ports',
  {
    ...ZygoteModel,
    devicePortId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    devicePortDeviceId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    devicePortName: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    devicePortCategory: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    devicePortNumber: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    devicePortStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device_ports',
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
