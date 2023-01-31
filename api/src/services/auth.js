import models from '../models'
import { Op } from 'sequelize'

const { User, Rol, Persona } = models

export default {
  checkUser: async (username) => {
    const userFound = await User.findOne({
      include: [
        {
          model: Rol,
          as: 'rol'
        },
        {
          model: Persona,
          as: 'persona'
        }
      ],
      where: {
        [Op.or]: {
          username,
          email: username
        },
        isActive: 'true'
      }
    })
    return userFound
  }
}
