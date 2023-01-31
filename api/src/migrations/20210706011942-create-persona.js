'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      documento: {
        type: Sequelize.STRING
      },
      primerNombre: {
        type: Sequelize.STRING
      },
      segundoNombre: {
        type: Sequelize.STRING
      },
      primerApellido: {
        type: Sequelize.STRING
      },
      segundoApellido: {
        type: Sequelize.STRING
      },
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      profesion_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Profesiones', key: 'id' }
      },
      idPais: {
        type: Sequelize.INTEGER,
        references: { model: 'Pais', key: 'id' }
      },
      idDepartamento: {
        type: Sequelize.INTEGER,
        references: { model: 'Departamentos', key: 'id' }
      },
      idMunicipio: {
        type: Sequelize.INTEGER,
        references: { model: 'Municipios', key: 'id' }
      },
      idComuna: {
        type: Sequelize.INTEGER,
        references: { model: 'Comunas', key: 'id' }
      },
      idBarrio: {
        type: Sequelize.INTEGER,
        references: { model: 'Barrios', key: 'id' }
      },
      direccion: {
        type: Sequelize.STRING
      },
      idGenero: {
        type: Sequelize.INTEGER,
        references: { model: 'Genero', key: 'id' }
      },
      perfil_profesional_id: {
        type: Sequelize.INTEGER,
        references: { model: 'perfilProfesional', key: 'id' },
        allowNull: true
      },
      referido_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      votacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
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
    await queryInterface.dropTable('Personas');
  }
};
