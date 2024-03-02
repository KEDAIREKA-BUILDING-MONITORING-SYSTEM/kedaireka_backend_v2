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
        device_floor_id: '',
        device_token: 'sdsad-46bb-82fb-werwr4345345345',
        device_status: 'standby'
      },
      {
        device_id: 'e80d5bfb-4710-sdses-rwer4w',
        device_name: 'monitoring suhu',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor_id: '',
        device_token: 'ewrwer455-dfgdfgdf0-tyty57676',
        device_status: 'active'
      },
      {
        device_id: 'sdsds-676767-yuyiuyiuyi',
        device_name: 'monitoring AC',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor_id: '',
        device_token: 'erwerwer1kjl-rtyry-drfwertwer',
        device_status: 'inactive'
      },
      {
        device_id: 'uiuyiuyi88b-4710-43ed-uiuyiuy',
        device_name: 'monitoring SS',
        device_building_id: 'erwer-f6ca-43f8-b8af-ewert4353454',
        device_room_id: 'sdsad-43f8-bsds-sd543534543',
        device_floor_id: '',
        device_token: 'sdsad-tyu567-fgsdfgdfgdfg-ertert',
        device_status: 'inactive'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('devices', null, {})
  }
}
