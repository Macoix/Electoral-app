'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configuracion extends Model {
    static associate(models) {}
  }
  Configuracion.init(
    {
      slogan: DataTypes.STRING,
      campana_img: DataTypes.STRING,
      text: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'Configuracion',
      modelName: 'Configuracion'
    }
  );
  return Configuracion;
};
