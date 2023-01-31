'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Candidato',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Colaboradores',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coordinadores de campanas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lideres',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
