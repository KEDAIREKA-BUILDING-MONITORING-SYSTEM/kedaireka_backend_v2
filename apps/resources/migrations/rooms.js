/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('rooms', {
      ...ZygoteModel,
      room_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      room_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      room_building_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      room_floor_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('rooms')
  }
}
