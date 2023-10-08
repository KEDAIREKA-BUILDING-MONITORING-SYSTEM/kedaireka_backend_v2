/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('device_ports', {
      ...ZygoteModel,
      device_port_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      device_port_device_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      device_port_name: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      device_port_category: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      device_port_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      device_port_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('device_ports')
  }
}
