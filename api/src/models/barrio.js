'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Barrio extends Model {
    static associate (models) {}
  }
  Barrio.init(
    {
      name: DataTypes.STRING,
      comuna_id: DataTypes.INTEGER,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Barrio',
      tableName: 'Barrios'
    }
  )
  Barrio.associate = (models) => {
    Barrio.belongsTo(models.Comuna, {
      foreignKey: 'comuna_id',
      as: 'comuna'
    })
  }
  return Barrio
}
