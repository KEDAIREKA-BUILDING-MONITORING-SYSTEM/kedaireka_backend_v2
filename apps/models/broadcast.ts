/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface BroadcastAttributes extends ZygoteAttributes {
  broadcastId: string
  broadcastName: string
  broadcastDuration: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type BroadcastCreationAttributes = Optional<
  BroadcastAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be
interface BroadcastInstance
  extends Model<BroadcastAttributes, BroadcastCreationAttributes>,
    BroadcastAttributes {}

export const BroadcastModel = sequelize.define<BroadcastInstance>(
  'broadcast',
  {
    ...ZygoteModel,
    broadcastId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    broadcastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    broadcastDuration: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'broadcast',
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
