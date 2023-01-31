import models from '../models'
import bcypt from 'bcrypt'
import Sequelize, { Op } from 'sequelize'
import getPagination from '../utils/getPagination'

const { User, Persona, PerfilProfesional } = models

export default {
  createUserPersonExist: async (req, res) => {
    const { username, email, password, idPersona } = req.body

    const salt = await bcypt.genSalt(10)

    const passwordEncrypt = await bcypt.hash(password, salt)

    const newUserObj = {
      username,
      email,
      password: passwordEncrypt,
      idPersona,
      idRol: 3,
      isActive: false
    }

    const newUser = await User.create(newUserObj)

    return newUser
  },
  CreateUserPerson: async (req, res) => {
    const {
      body: {
        username,
        password,
        documento,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        fechaNacimiento,
        email,
        telefono,
        idPais,
        idDepartamento,
        idMunicipio,
        idComuna,
        idBarrio,
        direccion,
        idGenero,
        latitude,
        longitude,
        profesionId,
        estudiosId,
        ocupacionId,
        referidocCc
      }
    } = req
    const perfil = {
      profesionId,
      estudiosId,
      ocupacionId
    }
    const userCheck = await User.findOne({
      where: {
        [Op.or]: {
          email,
          username
        }
      }
    })
    if (userCheck) {
      return res.status(500).json({
        message: 'Este usuario ya existe'
      })
    }
    const perfilProfesional = await PerfilProfesional.create(perfil)

    const perfilProfesionalId = perfilProfesional.id

    const referido = await Persona.findOne({
      where: {
        documento: referidocCc
      }
    })

    const referidoId = referido.id
    console.log('llegue aqui')
    const persona = {
      documento,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento,
      email,
      telefono,
      idPais,
      idDepartamento,
      idMunicipio,
      idComuna,
      idBarrio,
      direccion,
      idGenero,
      perfilProfesionalId,
      referidoId,
      latitude,
      longitude
    }
    console.log('persona check')

    const personaCheck = await Persona.findOne({
      where: {
        documento
      },
      include: {
        all: true,
        nested: true
      }
    })

    if (personaCheck) {
      throw new Error('persona ya existe')
    }
    console.log('guardanbdo persona')
    const newPersona = await Persona.create(persona)
    console.log('id persona en variable')
    const idPersona = newPersona.id

    const salt = await bcypt.genSalt(10)

    const passwordEncrypt = await bcypt.hash(password, salt)

    const newUserObj = {
      username,
      email,
      password: passwordEncrypt,
      idPersona,
      idRol: 3,
      isActive: false
    }
    const newUser = await User.create(newUserObj)

    return newUser
  },
  delete: async (id) => {
    await User.findOne({ where: { id } })
      .then((user) => {
        return user.update({
          deletedAt: Sequelize.fn('NOW'),
          isActive: false
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  getAllUsers: async (req, res) => {
    const users = await User.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      attributes: ['id', 'username', 'email'],
      include: { all: true, nested: true },
      order: [['id', 'ASC']]
    })

    return users
  },
  getAllUsersPagination: async (req, res) => {
    const { page, size } = req.query

    const { limit, offset } = getPagination(page, size)

    const users = await User.findAndCountAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      limit,
      offset,
      attributes: ['id', 'username', 'email', 'createdAt', 'isActive'],
      include: { all: true, nested: true },
      order: [['id', 'ASC']]
    })
    return users
  },
  getUserById: async (id) => {
    const user = await User.findOne({
      include: { all: true, nested: true },
      order: [['id', 'ASC']],
      where: { id }
    })

    return user
  },
  getUserByName: async (username) => {
    const user = await User.findOne({
      include: { all: true, nested: true },
      order: [['id', 'ASC']],
      where: { username }
    })

    return user
  },
  updateUser: async (req, res) => {
    const { id } = req.params
    const { email, username } = req.body

    const userCheck = await User.findOne({
      where: {
        [Op.or]: {
          email,
          username
        }
      },
      include: { all: true }
    })
    console.log(userCheck)
    if (userCheck.isActive) {
      const user = await User.update(req.body, {
        where: { id }
      })
      return user
    } else {
      await User.update(req.body, {
        where: { id }
      })

      const updated = { status: 'Activo', number: userCheck.persona.telefono }
      return updated
    }
  }
}
