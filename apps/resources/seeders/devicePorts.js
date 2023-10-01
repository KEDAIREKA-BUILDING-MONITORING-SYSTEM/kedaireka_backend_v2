/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('device_ports', [
      {
        device_port_id: 'e80sdsds0-43ed-erere-74aft45654654r',
        device_port_device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_port_name: 'dht ku',
        device_port_category: 'input',
        device_port_number: 1,
        device_port_status: false
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('device_ports', null, {})
  }
}
