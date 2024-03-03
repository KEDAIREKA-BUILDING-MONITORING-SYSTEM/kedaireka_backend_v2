/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('broadcast', {
      ...ZygoteModel,
      broadcast_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      broadcast_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      broadcast_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('broadcast')
  }
}
