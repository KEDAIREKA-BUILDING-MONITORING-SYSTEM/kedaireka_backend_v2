/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('broadcast', [
      {
        broadcast_id: 'ewr234532rewrewr',
        broadcast_name: 'pengumuman cuti',
        broadcast_duration: 20
      },
      {
        broadcast_id: 'ewsdsd45sdsdsdsdrewr',
        broadcast_name: 'pengumuman 1',
        broadcast_duration: 5
      },
      {
        broadcast_id: '4r4545sdsds56t535dsdrewr',
        broadcast_name: 'pengumuman 2',
        broadcast_duration: 2
      },
      {
        broadcast_id: 'wer35ds453423wr',
        broadcast_name: 'pengumuman 3',
        broadcast_duration: 2
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('broadcast', null, {})
  }
}
