/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('device_port_logs', {
      ...ZygoteModel,
      device_port_log_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      device_port_log_device_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      device_port_log_value: {
        type: Sequelize.JSON,
        allowNull: false
      },
      device_port_log_name: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      device_port_log_port_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      device_port_log_category: {
        type: Sequelize.STRING(80),
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('device_port_logs')
  }
}
