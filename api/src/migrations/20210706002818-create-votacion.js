'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Votaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nuit: {
        type: Sequelize.STRING
        // references: { model: 'persona', key: 'id' }
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Departamentos', key: 'id' }
      },
      municipio_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Municipios', key: 'id' }
      },
      puesto: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      mesa: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Votaciones');
  }
};
