/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface ReportAttributes extends ZygoteAttributes {
  reportId: string
  reportMessage: string
  reportHttpStatusCode: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type ReportCreationAttributes = Optional<
  ReportAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface ReportInstance
  extends Model<ReportAttributes, ReportCreationAttributes>,
    ReportAttributes {}

export const ReportModel = sequelize.define<ReportInstance>(
  'reports',
  {
    ...ZygoteModel,
    reportId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    reportMessage: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    reportHttpStatusCode: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'reports',
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
