import models from '../models'
import Sequelize, { Op } from 'sequelize'

const { Barrio, Comuna } = models
export default {
  getAll: async () => {
    const barrios = await Barrio.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      include: {
        model: Comuna,
        as: 'comuna'
      },
      order: [['name', 'ASC']]
    })

    return barrios
  },
  create: async barrio => {
    const barrioCreated = await Barrio.create(barrio)

    return barrioCreated
  },
  update: async (id, barrioObj) => {
    await Barrio.update(barrioObj, {
      where: { id }
    })

    const barrio = await Barrio.findByPk(id)

    return barrio
  },
  delete: async (id, momento) => {
    await Barrio.findOne({ where: { id } }).then(barrio => {
      return barrio.update({ deletedAt: Sequelize.fn('NOW') })
    })
  },
  getByIdComuna: async id => {
    const barrios = await Barrio.findAll({ where: { comuna_id: id } })

    return barrios
  },
  getByIdBarrio: async id => {
    const barrios = await Barrio.findOne({
      where: { id },
      include: {
        all: true,
        nested: true
      }
    })
    return barrios
  },
  findCountAll: async (limit, offset, name) => {
    return await Barrio.findAndCountAll({
      limit,
      offset,
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        [Op.and]: [
          name && {
            name: Sequelize.where(
              Sequelize.fn('unaccent', Sequelize.col('Barrio.name')),
              {
                [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
              }
            )
          }
        ]
      },
      include: {
        model: Comuna,
        as: 'comuna'
      },
      order: [['name', 'ASC']]
    })
  },
  getByname: async name => {
    const barrio = Barrio.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        [Op.and]: [
          name && {
            name: Sequelize.where(
              Sequelize.fn('unaccent', Sequelize.col('Barrio.name')),
              {
                [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
              }
            )
          }
        ]
      }
    })
    return barrio
  },
  bulkCreate: async barriosArr => {
    const barrios = Barrio.bulkCreate(barriosArr)
    return barrios
  }
}
