/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      ...ZygoteModel,
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_name: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      user_email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_role: {
        type: Sequelize.ENUM('user', 'admin', 'superAdmin'),
        allowNull: false,
        defaultValue: 'user'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
