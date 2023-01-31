'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Departamentos', [
      {
        name: 'Tolima',
        pais_id: 1,
        latitude: '4.433',
        longitude: '-75.217',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Departamentos', null, {});
  }
};
