import UsersServices from '../services/users'
import PersonaServices from '../services/persona'
import authService from '../services/auth'
import emailController from './mail'
import smsController from './sms'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default {
  create: async (req, res, next) => {
    console.log(req.body)
    try {
      const { switchP } = req.body
      if (!switchP) {
        const user = await UsersServices.createUserPersonExist(req, res)
        res.status(200).json({
          user,
          message: 'Usuario creado exitosamente'
        })
      } else {
        const user = await UsersServices.CreateUserPerson(req, res)
        res.status(200).json({
          user,
          message: 'Usuario creado exitosamente'
        })
      }
    } catch (err) {
      res.status(500).json({ message: 'Hubo un error al crear el usuario' })
    }
  },
  get: async (req, res, next) => {
    try {
      const users = await UsersServices.getAllUsers(req, res)

      res.status(200).json({
        users
      })
    } catch (err) {
      res.status(400).json({
        error: err
      })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params

      await UsersServices.delete(id)

      res.status(200).json({ message: 'Usuario borrado satisfactoriamente' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },
  getPagination: async (req, res, next) => {
    try {
      const users = await UsersServices.getAllUsersPagination(req, res)

      res.status(200).json({
        users
      })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const user = await UsersServices.getUserById(id)

      res.status(200).json({ user })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  update: async (req, res) => {
    try {
      const { email } = req.body

      const user = await UsersServices.updateUser(req, res)
      console.log(user)
      if (user.status === 'Activo') {
        try {
          smsController.validationSms(user.number)
        } catch (error) {
          console.log(error.message)
        }
        emailController.sendEmailActive(email)
      }

      res.status(200).json({ message: 'Actualización exitosa' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  getUserToken: async (req, res) => {
    console.log(req)
    const { username } = req

    try {
      const user = await UsersServices.getUserByName(username)
      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
    }
  }
}
