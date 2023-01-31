'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('perfilProfesional', 'ocupacion', {});
    await queryInterface.addColumn('perfilProfesional', 'ocupacion_id', {
      type: Sequelize.INTEGER,
      references: { model: 'ocupaciones', key: 'id' },
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {}
};
