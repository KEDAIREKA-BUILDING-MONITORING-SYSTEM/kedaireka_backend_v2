/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      ...ZygoteModel,
      room_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      room_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      room_building_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms')
  }
}
