/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reports', [
      {
        report_id: 'sdsd4-sds4ds45-bsd3453sdsddsdsds',
        report_message: 'gedung C, Lantai 2, ruangan 211, device 1 gagal mengirim data',
        report_http_status_code: 408
      },
      {
        report_id: 'sdsad4-sd324324ds45-bsd4324sdsds-erfsdfsd',
        report_message: 'gedung C, Lantai 3, ruangan 301, device 7 gagal mengirim data',
        report_http_status_code: 400
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reports', null, {})
  }
}
