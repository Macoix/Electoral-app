'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Votaciones', 'Femenino', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Votaciones', 'Masculino', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('Votaciones', 'Total', {
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Votaciones');
  }
};
