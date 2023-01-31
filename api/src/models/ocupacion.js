'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ocupacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ocupacion.init(
    {
      name: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'ocupacion',
      tableName: 'ocupaciones'
    }
  );
  return ocupacion;
};
