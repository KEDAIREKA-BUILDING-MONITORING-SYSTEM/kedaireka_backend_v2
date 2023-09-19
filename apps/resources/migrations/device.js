/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('device', {
      ...ZygoteModel,
      device_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      device_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      device_type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      device_category: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      device_building: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      device_room: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      device_status: {
        type: Sequelize.BOOLEAN,
        allowNull: true ,
        defaultValue: 0
      },
      device_token: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('device')
  }
}
