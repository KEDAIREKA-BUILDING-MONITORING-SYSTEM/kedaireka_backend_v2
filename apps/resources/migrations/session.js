/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sessions', {
      ...ZygoteModel,
      session_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      session_admin_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      session: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      session_expired_on: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('sessions')
  }
}
