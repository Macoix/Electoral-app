'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comunas', [
      {
        name: 'comuna X',
        municipio_id: 1,
        ambito: 'Urbano',
        latitude: '4.4426',
        longitude: '-75.2446',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comunas', null, {});
  }
};
