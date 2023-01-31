'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comuna extends Model {
    static associate (models) {}
  }
  Comuna.init(
    {
      municipio_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      ambito: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Comuna'
    }
  )
  Comuna.associate = models => {
    Comuna.belongsTo(models.Municipio, {
      foreignKey: 'municipio_id',
      as: 'municipio'
    })
  }
  return Comuna
}
