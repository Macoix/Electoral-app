import models from '../models'
import Sequelize, { Op } from 'sequelize'

const { Comuna, Municipio } = models
export default {
  getAll: async (req, res) => {
    try {
      const comunas = await Comuna.findAll({
        where: {
          deletedAt: {
            [Op.eq]: null
          }
        },
        include: {
          model: Municipio,
          as: 'municipio'
        },
        order: [['name', 'ASC']]
      })

      return comunas
    } catch (error) {
      return error
    }
  },
  create: async comuna => {
    const comunaCreated = await Comuna.create(comuna)

    return comunaCreated
  },
  update: async (id, comunaObj) => {
    Comuna.update(comunaObj, {
      where: { id }
    })

    const comuna = await Comuna.findByPk(id)

    return comuna
  },
  delete: async id => {
    await Comuna.findOne({ where: { id } }).then(barrio => {
      return barrio.update({ deletedAt: Sequelize.fn('NOW') })
    })
  },
  getByIdMunicipio: async (req, res) => {
    const { id } = req.params

    const comuna = await Comuna.findAll({
      where: {
        municipio_id: id,
        deletedAt: {
          [Op.eq]: null
        }
      }
    })

    return comuna
  },
  getById: async req => {
    const { id } = req.params

    const comuna = Comuna.findOne({
      where: { id },
      include: {
        model: Municipio,
        as: 'municipio'
      }
    })

    return comuna
  },
  findCountAll: async (name) => {
    return await Comuna.findAndCountAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        [Op.and]: [
          name && {
            name: Sequelize.where(
              Sequelize.fn('unaccent', Sequelize.col('Comuna.name')),
              {
                [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
              }
            )
          }
        ]
      },
      include: {
        model: Municipio,
        as: 'municipio'
      },
      order: [['name', 'ASC']]
    })
  },
  getByname: async name => {
    const comuna = await Comuna.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        name: Sequelize.where(
          Sequelize.fn('unaccent', Sequelize.col('Comuna.name')),
          {
            [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
          }
        )
      }
    })

    return comuna
  },
  bulkCreate: async comunaArray => {
    const comunas = Comuna.bulkCreate(comunaArray)
    return comunas
  }
}
