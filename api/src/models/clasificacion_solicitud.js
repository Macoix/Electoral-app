'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clasificacion_solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clasificacion_solicitud.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'clasificacion_solicitud'
    }
  );
  return clasificacion_solicitud;
};
