/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rooms', [
      {
        room_id: 'sdsad-43f8-bsds-sd543534543',
        room_name: 'GKU01',
        room_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        room_floor_id: ''
      },
      {
        room_id: 'erwwerd-4334534-bsds-sd34rfgdfg5yrty',
        room_name: 'GKU02',
        room_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        room_floor_id: ''
      },
      {
        room_id: 'dfsdf-4343rt53-bsds-retrtghthfgh',
        room_name: 'GKU03',
        room_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        room_floor_id: ''
      },
      {
        room_id: 'dsfsdf-uyjghjklkjklui-hjghjghj',
        room_name: 'GKU04',
        room_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        room_floor_id: ''
      },
      {
        room_id: 'yutyu-uy7686kjjhjgjkjklui-rterrtiuoity',
        room_name: 'GKU05',
        room_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        room_floor_id: ''
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {})
  }
}
