'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Barrios', [
      {
        name: 'Barrio X',
        comuna_id: 1,
        latitude: '4.4426',
        longitude: '-75.2446',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Barrios', null, {});
  }
};
