'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Votacion.init(
    {
      nuit: DataTypes.STRING,
      departamento_id: DataTypes.INTEGER,
      municipio_id: DataTypes.INTEGER,
      puesto: DataTypes.STRING,
      direccion: DataTypes.STRING,
      mesa: DataTypes.STRING,
      Femenino: DataTypes.INTEGER,
      Masculino: DataTypes.INTEGER,
      Total: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'Votaciones',
      modelName: 'Votacion'
    }
  );
  Votacion.associate = (models) => {
    Votacion.belongsTo(models.Departamento, {
      foreignKey: 'departamento_id',
      as: 'departamento'
    });
    Votacion.belongsTo(models.Municipio, {
      foreignKey: 'municipio_id',
      as: 'municipio'
    });
  };
  return Votacion;
};
