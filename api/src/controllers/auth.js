import authService from '../services/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default {
  login: async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'usuario y contraseña requeridas' })
    try {
      const userFound = await authService.checkUser(username)
      if (!userFound) return res.status(400).json({ type: 'user', message: 'El usuario no existe o esta inactivo' })
      const validPassword = await bcrypt.compare(password, userFound.password)
      if (validPassword) {
        const accessToken = jwt.sign(
          { username: userFound.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30m' }
        )

        // const refreshToken = jwt.sign(
        //   { id: userFound.id },
        //   process.env.REFRESH_TOKEN_SECRET,
        //   { expiresIn: '1d' }
        // )
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ accessToken })
      } else {
        return res.status(401).json({ type: 'password', message: 'Contraseña invalida' })
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  check: async (req, res) => {
    const {
      body: { token }
    } = req

    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, valid) => {
      if (err) {
        res.status(500).json({ message: 'Invalid Token' })
      } else {
        res.status(200).json({ message: 'Valid Token' })
      }
    })
  }
}
