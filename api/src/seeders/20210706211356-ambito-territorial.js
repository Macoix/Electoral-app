'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genero', [
      {
        name: 'Masculino',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Femenino',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genero', null, {});
  }
};
