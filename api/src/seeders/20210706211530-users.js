'use strict';
const bcypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcypt.genSalt(10);

    const passwordEncrypt = await bcypt.hash('12345', salt);
    return queryInterface.bulkInsert('Users', [
      {
        username: 'usuario1',
        email: 'usuario1@example.com',
        password: passwordEncrypt,
        idPersona: 1,
        idRol: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
