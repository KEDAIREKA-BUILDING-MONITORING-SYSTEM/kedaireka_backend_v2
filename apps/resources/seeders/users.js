/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: '8f05dd7e-cda7-41fb-bc77-f6bb1eaf1fdc',
        user_email: 'admin@mail.com',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'admin'
      },
      {
        user_id: 'd549913e-5620-42b8-8ed1-3d85ebf848d8',
        user_email: 'superadmin@mail.com',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'superAdmin'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
