/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('admins', {
      ...ZygoteModel,
      admin_id: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      admin_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      admin_email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      admin_password: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      admin_created_by: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      admin_role: {
        type: DataTypes.ENUM('admin', 'superAdmin'),
        allowNull: true,
        defaultValue: 'admin'
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('admins')
  }
}
