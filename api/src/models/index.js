import Sequelize from 'sequelize'
import config from '../../db.config.json'
import 'dotenv/config'
// --------modelos----------
import genero from './genero'
import barrio from './barrio'
import comuna from './comuna'
import configuracion from './configuracion'
import departamento from './departamento'
import documento from './documentos'
import municipio from './municipio'
import pais from './pais'
import personas from './persona'
import profesion from './profesion'
import rols from './rol'
import users from './user'
import votacion from './votacion'
import terminos from './terminoscondiciones'
import perfilProfesional from './perfilprofesional'
import estudios from './estudios'
import ocupacion from './ocupacion'

const env = process.env.NODE_ENV || 'dev'

const { username, password, database } = config[env]

const db = {}

const sequelize = new Sequelize(database, username, password, config[env])

db.Genero = genero(sequelize, Sequelize.DataTypes)
db.Barrio = barrio(sequelize, Sequelize.DataTypes)
db.Comuna = comuna(sequelize, Sequelize.DataTypes)
db.Configuracion = configuracion(sequelize, Sequelize.DataTypes)
db.Documento = documento(sequelize, Sequelize.DataTypes)
db.Departamento = departamento(sequelize, Sequelize.DataTypes)
db.Municipio = municipio(sequelize, Sequelize.DataTypes)
db.Pais = pais(sequelize, Sequelize.DataTypes)
db.Persona = personas(sequelize, Sequelize.DataTypes)
db.Profesion = profesion(sequelize, Sequelize.DataTypes)
db.Rol = rols(sequelize, Sequelize.DataTypes)
db.User = users(sequelize, Sequelize.DataTypes)
db.Votacion = votacion(sequelize, Sequelize.DataTypes)
db.Terminos = terminos(sequelize, Sequelize.DataTypes)
db.PerfilProfesional = perfilProfesional(sequelize, Sequelize.DataTypes)
db.Estudios = estudios(sequelize, Sequelize.DataTypes)
db.Ocupacion = ocupacion(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
