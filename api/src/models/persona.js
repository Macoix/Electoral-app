'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate (models) {}
  }
  Persona.init(
    {
      documento: DataTypes.STRING,
      primerNombre: DataTypes.STRING,
      segundoNombre: DataTypes.STRING,
      primerApellido: DataTypes.STRING,
      segundoApellido: DataTypes.STRING,
      fecha_nacimiento: DataTypes.DATE,
      email: DataTypes.STRING,
      telefono: DataTypes.STRING,
      idPais: DataTypes.INTEGER,
      idDepartamento: DataTypes.INTEGER,
      idMunicipio: DataTypes.INTEGER,
      idComuna: DataTypes.INTEGER,
      idBarrio: DataTypes.INTEGER,
      direccion: DataTypes.STRING,
      idGenero: DataTypes.INTEGER,
      referido_id: DataTypes.INTEGER,
      perfil_profesional_id: DataTypes.INTEGER,
      votacion_id: DataTypes.INTEGER,
      latitude: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Persona',
      tableName: 'Personas'
    }
  )
  Persona.associate = (models) => {
    Persona.belongsTo(models.Pais, {
      foreignKey: 'idPais',
      as: 'pais'
    })
    Persona.belongsTo(models.Departamento, {
      foreignKey: 'idDepartamento',
      as: 'departamento'
    })
    Persona.belongsTo(models.Municipio, {
      foreignKey: 'idMunicipio',
      as: 'municipio'
    })
    Persona.belongsTo(models.Comuna, {
      foreignKey: 'idComuna',
      as: 'comuna'
    })
    Persona.belongsTo(models.Barrio, {
      foreignKey: 'idBarrio',
      as: 'barrio'
    })
    Persona.belongsTo(models.Genero, {
      foreignKey: 'idGenero',
      as: 'genero'
    })
    Persona.belongsTo(models.Votacion, {
      foreignKey: 'votacion_id',
      as: 'puesto_votacion'
    })
    Persona.belongsTo(models.PerfilProfesional, {
      foreignKey: 'perfil_profesional_id',
      as: 'perfil_profesional'
    })
    Persona.hasOne(models.User, {
      foreignKey: 'idPersona',
      as: 'usuario'
    })
  }
  return Persona
}
