'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    static associate(models) {}
  }
  Departamento.init(
    {
      pais_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Departamento'
    }
  );
  Departamento.associate = (models) => {
    Departamento.belongsTo(models.Pais, {
      foreignKey: 'pais_id',
      as: 'pais'
    });
  };
  return Departamento;
};
