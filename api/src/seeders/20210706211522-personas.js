'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Personas', [
      {
        documento: '12312414',
        primerNombre: 'Juan',
        segundoNombre: 'Francisco',
        primerApellido: 'Gomez',
        segundoApellido: 'Gutierrez',
        fecha_nacimiento: new Date(),
        email: 'usuario1@example.com',
        telefono: '123456789',
        profesion_id: 1,
        idPais: 1,
        idDepartamento: 1,
        idMunicipio: 1,
        idComuna: 1,
        idBarrio: 1,
        direccion: 'Direccion generica colocada aca',
        idGenero: 1,
        latitude: '4.4426',
        longitude: '-75.2446',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Personas', null, {});
  }
};
