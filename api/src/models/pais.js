'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pais extends Model {
    static associate(models) {}
  }
  Pais.init(
    {
      code: DataTypes.INTEGER,
      name: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Pais'
    }
  );
  return Pais;
};
