/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface DeviceSensorsAttributes extends ZygoteAttributes {
  deviceSensorId: string
  deviceSensorDeviceId: string
  deviceSensorName: string
  deviceSensorCategory: string
  deviceSensorPort: number
  deviceSensorStatus: boolean
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type DeviceSensorsCreationAttributes = Optional<
  DeviceSensorsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface DeviceSensorsInstance
  extends Model<DeviceSensorsAttributes, DeviceSensorsCreationAttributes>,
    DeviceSensorsAttributes {}

export const DeviceSensorsModel = sequelize.define<DeviceSensorsInstance>(
  'device_sensors',
  {
    ...ZygoteModel,
    deviceSensorId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceSensorDeviceId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceSensorName: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    deviceSensorCategory: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    deviceSensorPort: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    deviceSensorStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'device_sensors',
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
