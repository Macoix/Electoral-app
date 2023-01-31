'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('perfilProfesional', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profesion_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Profesiones', key: 'id' }
      },
      ocupacion: {
        type: Sequelize.TEXT
      },
      estudios_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Estudios', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('perfilProfesional');
  }
};
