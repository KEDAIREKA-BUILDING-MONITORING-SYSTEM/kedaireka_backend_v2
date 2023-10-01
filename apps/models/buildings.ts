/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface BuildingsAttributes extends ZygoteAttributes {
  buildingId: string
  buildingName: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type BuildingsCreationAttributes = Optional<
  BuildingsAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface BuildingsInstance
  extends Model<BuildingsAttributes, BuildingsCreationAttributes>,
    BuildingsAttributes {}

export const BuildingsModel = sequelize.define<BuildingsInstance>(
  'buildings',
  {
    ...ZygoteModel,
    buildingId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    buildingName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'buildings',
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
