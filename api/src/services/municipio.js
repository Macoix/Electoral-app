import models from '../models'
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize'

const { Municipio, Departamento } = models
export default {
  getAll: async (req, res) => {
    try {
      const municipios = await Municipio.findAll({
        where: {
          deletedAt: {
            [Op.eq]: null
          }
        },
        include: {
          model: Departamento,
          as: 'departamento'
        },
        order: [['name', 'ASC']]
      })

      return municipios
    } catch (error) {
      return error
    }
  },
  create: async (municipioObj) => {
    const municipio = await Municipio.create(municipioObj)

    return municipio
  },
  update: async (id, municipioObj) => {
    await Municipio.update(municipioObj, {
      where: { id }
    })

    const municipio = await Municipio.findByPk(id)

    return municipio
  },
  delete: async (id) => {
    await Municipio.findOne({ where: { id } }).then(
      (municipio) => {
        return municipio.update({ deletedAt: Sequelize.fn('NOW') })
      }
    )
  },
  getByIdDepartamento: async (req, res) => {
    const { id } = req.params

    const municipio = await Municipio.findAll({ where: { departamento_id: id } })

    return municipio
  },
  getById: async (req, res) => {
    const { id } = req.params

    const municipio = await Municipio.findOne({
      where: { id },
      include: {
        model: Departamento,
        as: 'departamento'
      }
    })

    return municipio
  },
  findAndCountAll: async (name) => {
    return await Municipio.findAndCountAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        [Op.and]: [
          name && {
            name: Sequelize.where(
              Sequelize.fn('unaccent', Sequelize.col('Municipio.name')),
              {
                [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
              }
            )
          }
        ]
      },
      include: {
        model: Departamento,
        as: 'departamento'
      },
      order: [['name', 'ASC']]
    })
  },
  getByname: async (name) => {
    const municipio = await Municipio.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
          [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
        })
      }
    })

    return municipio
  },
  bulkCreate: async (municipios) => {
    const munis = await Municipio.bulkCreate(municipios)
    return munis
  }
}
