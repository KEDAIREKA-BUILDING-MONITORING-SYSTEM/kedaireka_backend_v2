/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('settings', {
      ...ZygoteModel,
      setting_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      setting_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      setting_category: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('settings')
  }
}
