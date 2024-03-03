/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('device_port_logs', {
      ...ZygoteModel,
      device_port_log_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      device_port_log_device_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      device_port_log_value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      device_port_log_name: {
        type: DataTypes.STRING(80),
        allowNull: true
      },
      device_port_log_port_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      device_port_log_category: {
        type: DataTypes.STRING(80),
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('device_port_logs')
  }
}
