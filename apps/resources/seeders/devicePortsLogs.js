/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('device_port_logs', [
      {
        device_port_log_id: 'rwerwer-23425345-43ed-erere-5634ergfg',
        device_port_log_device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_port_log_value: '{"temperature": 21}',
        device_port_log_name: 'dht',
        device_port_log_port_number: 1,
        device_port_log_category: 'input'
      },
      {
        device_port_log_id: 'werwe-425345-43ed-erere-56sdsdsd3re',
        device_port_log_device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_port_log_value: '{"temperature": 25}',
        device_port_log_name: 'dht',
        device_port_log_port_number: 1,
        device_port_log_category: 'input'
      },
      {
        device_port_log_id: 'ret45r23425345-43544rere-56345445ty',
        device_port_log_device_id: 'erwe5435-4710-4534-ba9a-74af2b543',
        device_port_log_value: '{"humidity": 25}',
        device_port_log_name: 'dht',
        device_port_log_port_number: 2,
        device_port_log_category: 'input'
      },
      {
        device_port_log_id: 'sdsa-5645rty-425345-43ed-erere-56sds7876',
        device_port_log_device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_port_log_value: '{"temperature": 25}',
        device_port_log_name: 'dht',
        device_port_log_port_number: 2,
        device_port_log_category: 'input'
      },
      {
        device_port_log_id: 'sd23423-5435345y-425345-43ereterere-5643543',
        device_port_log_device_id: 'e80d5bfb-4710-43ed-ba9a-74af2b368dd0',
        device_port_log_value: '{"value": false}',
        device_port_log_name: 'relay',
        device_port_log_port_number: 4,
        device_port_log_category: 'output'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('device_port_logs', null, {})
  }
}
