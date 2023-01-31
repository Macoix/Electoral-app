'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Municipio extends Model {
    static associate(models) {}
  }
  Municipio.init(
    {
      departamento_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Municipio'
    }
  );
  Municipio.associate = (models) => {
    Municipio.belongsTo(models.Departamento, {
      foreignKey: 'departamento_id',
      as: 'departamento'
    });
  };
  return Municipio;
};
