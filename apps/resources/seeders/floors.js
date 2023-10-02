/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('floors', [
      {
        floor_id: 'sdsad-43f8-bsds-sd543534543',
        floor_name: 'GKU01',
        floor_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('floors', null, {})
  }
}
