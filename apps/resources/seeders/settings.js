/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('settings', [
      {
        setting_id: 'ewr234532rewrewr',
        setting_name: 'Theme',
        setting_category: 'general'
      },
      {
        setting_id: 'ewew5334343rewr',
        setting_name: 'control',
        setting_category: 'device'
      },
      {
        setting_id: 'wewe3432432',
        setting_name: 'hak akses',
        setting_category: 'system'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings', null, {})
  }
}
