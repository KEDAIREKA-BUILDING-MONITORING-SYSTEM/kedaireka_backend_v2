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
        type: Sequelize.ENUM('dht', 'mq2'),
        allowNull: false
      },
      device_category: {
        type: Sequelize.ENUM('input', 'output'),
        allowNull: false
      },
      device_value: {
        type: Sequelize.JSON,
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('device')
  }
}
