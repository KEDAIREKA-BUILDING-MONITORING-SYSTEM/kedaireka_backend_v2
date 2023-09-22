/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('device_port_logs', [
      {
        device_port_log_id: 'sadsada3erwr-ewr-srwerwe234234',
        device_port_log_device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_port_log_value: '{temperature: 33, humidity}',
        device_port_log_name: 'dht',
        device_port_log_number: 1,
        device_port_log_category: 'input'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('device_port_logs', null, {})
  }
}
