/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface SettingsAttributes extends ZygoteAttributes {
  settingId: string
  settingName: string
  settingCategory: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type SettingsCreationAttributes = Optional<
  SettingsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface SettingsInstance
  extends Model<SettingsAttributes, SettingsCreationAttributes>,
    SettingsAttributes {}

export const SettingsModel = sequelize.define<SettingsInstance>(
  'settings',
  {
    ...ZygoteModel,
    settingId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    settingName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    settingCategory: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'settings',
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
