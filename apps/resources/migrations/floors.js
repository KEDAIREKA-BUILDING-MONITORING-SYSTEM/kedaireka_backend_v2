/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('floors', {
      ...ZygoteModel,
      floor_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      floor_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      floor_building_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('floors')
  }
}
