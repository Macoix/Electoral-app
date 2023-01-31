'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Configuracion', [
      {
        slogan: 'Slogan',
        campana_img: '',
        text: 'Texto',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Configuracion', null, {});
  }
};
