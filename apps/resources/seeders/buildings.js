/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buildings', [
      {
        building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        building_name: 'GKU'
      },
      {
        building_id: 'werwere-f6ca-53458-b8af-e435542344',
        building_name: 'A'
      },
      {
        building_id: 'reterte-f6ca-43reteraf-e5645345ert',
        building_name: 'B'
      },
      {
        building_id: 'dfsdf45-f6ca-43f8-b8af-dsfsdf4tegh',
        building_name: 'C'
      },
      {
        building_id: 'dfads5t4e-f6ca565468-b854645-435re',
        building_name: 'LABTEK OZT'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('buildings', null, {})
  }
}
