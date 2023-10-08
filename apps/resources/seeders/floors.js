/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('floors', [
      {
        floor_id: 'sd4543534-445345-bsd34534-d5ty6773rwe',
        floor_name: 'GKU01',
        floor_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('floors', null, {})
  }
}
