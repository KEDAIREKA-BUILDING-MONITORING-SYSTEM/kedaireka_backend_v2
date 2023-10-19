/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('reports', {
      ...ZygoteModel,
      report_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      report_message: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      report_http_status_code: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('reports')
  }
}
