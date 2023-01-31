'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class terminosCondiciones extends Model {
    static associate(models) {}
  }
  terminosCondiciones.init(
    {
      texto: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'terminosCondiciones'
    }
  );
  return terminosCondiciones;
};
