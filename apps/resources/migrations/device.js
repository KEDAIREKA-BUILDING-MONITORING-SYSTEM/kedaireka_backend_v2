/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('devices', {
      ...ZygoteModel,
      device_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      device_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      device_building_id: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      device_room_id: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      device_floor: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      device_status: {
        type: DataTypes.ENUM('active', 'inactive', 'standby'),
        allowNull: false,
        defaultValue: 'standby'
      },
      device_token: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      device_timmer: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('devices')
  }
}
