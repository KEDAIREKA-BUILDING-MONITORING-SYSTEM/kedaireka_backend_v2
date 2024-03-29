/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { DevicePortLogsModel } from './devicePortLogs'
import { DevicePortsModel } from './devicePorts'
import { BuildingsModel } from './buildings'
import { RoomsModel } from './rooms'
import { FloorsModel } from './floor'

export interface DeviceAttributes extends ZygoteAttributes {
  deviceId: string
  deviceName: string
  deviceBuildingId: string
  deviceRoomId: string
  deviceFloorId: string
  deviceToken: string
  deviceStatus: 'active' | 'inactive' | 'standby'
  deviceTimmer: string
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
  'devices',
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
    deviceBuildingId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceRoomId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceFloorId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deviceToken: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    deviceStatus: {
      type: DataTypes.ENUM('active', 'inactive', 'standby'),
      allowNull: false,
      defaultValue: 'standby'
    },
    deviceTimmer: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'devices',
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

DeviceModel.hasMany(DevicePortLogsModel, {
  as: 'devicePortLogs',
  sourceKey: 'deviceId',
  foreignKey: 'devicePortLogDeviceId'
})

DeviceModel.hasMany(DevicePortsModel, {
  as: 'devicePorts',
  sourceKey: 'deviceId',
  foreignKey: 'devicePortDeviceId'
})

DeviceModel.hasOne(BuildingsModel, {
  as: 'building',
  sourceKey: 'deviceBuildingId',
  foreignKey: 'buildingId'
})

DeviceModel.hasOne(FloorsModel, {
  as: 'floor',
  sourceKey: 'deviceFloorId',
  foreignKey: 'floorId'
})

DeviceModel.hasOne(RoomsModel, {
  as: 'room',
  sourceKey: 'deviceRoomId',
  foreignKey: 'roomId'
})
