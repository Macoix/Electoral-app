import models from '../models'
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize'

const { Genero } = models

export default {
  getAll: async (req) => {
    const Generos = await Genero.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      }
    })

    return Generos
  },
  createGenero: async (req) => {
    const { body: name } = req

    const genero = await Genero.create(name)

    return genero
  },
  update: async (id, genero) => {
    await Genero.update(genero, {
      where: {
        id
      }
    })

    const generoFound = await Genero.findOne({ where: { id } })

    return generoFound
  },
  delete: async (id) => {
    Genero.findOne({ where: { id } }).then((barrio) => {
      return barrio.update({ deletedAt: Sequelize.fn('NOW') })
    })
  },
  getById: async (req) => {
    const { id } = req.params

    const genero = Genero.findOne({ where: { id } })

    return genero
  },
  getPagination: async (req, res) => {
    const { page, size } = req.query
    const { limit, offset } = getPagination(page, size)

    const generos = await Genero.findAndCountAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      limit,
      offset,
      include: { all: true, nested: true },
      order: [['id', 'ASC']]
    })
    return generos
  },
  getByName: async (name) => {
    const genero = await Genero.findOne({
      where: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
        [Op.iLike]: `%${name}%`
      })
    })

    return genero
  },
  bulkCreate: async (generosArray) => {
    const generos = await Genero.bulkCreate(generosArray)
    return generos
  }
}
