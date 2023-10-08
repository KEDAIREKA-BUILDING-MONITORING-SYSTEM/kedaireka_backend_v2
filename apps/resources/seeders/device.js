/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('devices', [
      {
        device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_name: 'dht ku',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor: 1,
        device_token: 'ca93da53-427e-46bb-82fb-217e5b9a3cc1',
        device_status: 'standby'
      },
      {
        device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_name: 'monitoring suhu',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor: 5,
        device_token: 'ca93da53-427e-46bb-82fb-217e5b9a3cc1',
        device_status: 'active'
      },
      {
        device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_name: 'monitoring AC',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor: 4,
        device_token: 'ca93da53-427e-46bb-82fb-217e5b9a3cc1',
        device_status: 'inactive'
      },
      {
        device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_name: 'monitoring SS',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor: 5,
        device_token: 'ca93da53-427e-46bb-82fb-217e5b9a3cc1',
        device_status: 'inactive'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('devices', null, {})
  }
}
