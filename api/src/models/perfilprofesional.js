'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class perfilProfesional extends Model {
    static associate(models) {
      // define association here
    }
  }
  perfilProfesional.init(
    {
      profesion_id: DataTypes.INTEGER,
      ocupacion_id: DataTypes.INTEGER,
      estudios_id: DataTypes.INTEGER
    },
    {
      sequelize,
      tableName: 'perfilProfesional',
      modelName: 'perfilProfesional'
    }
  );
  perfilProfesional.associate = (models) => {
    perfilProfesional.belongsTo(models.Profesion, {
      foreignKey: 'profesion_id',
      as: 'profesion'
    });
    perfilProfesional.belongsTo(models.Estudios, {
      foreignKey: 'estudios_id',
      as: 'estudios'
    });
    perfilProfesional.belongsTo(models.Ocupacion, {
      foreignKey: 'ocupacion_id',
      as: 'ocupacion'
    });
  };
  return perfilProfesional;
};
