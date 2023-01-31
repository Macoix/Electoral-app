import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Pais } = models;
export default {
  getAll: async (req, res) => {
    try {
      const pais = await Pais.findAll({
        where: {
          deletedAt: {
            [Op.eq]: null
          }
        },
        order: [['name', 'ASC']]
      });

      return pais;
    } catch (error) {
      return error;
    }
  },
  create: async (paisObj) => {
    const pais = await Pais.create(paisObj);

    return pais;
  },
  update: async (id, paisObj) => {
    const paisUpdated = await Pais.update(paisObj, {
      where: { id }
    });

    const pais = await Pais.findByPk(id);

    return pais;
  },
  delete: async (id) => {
    const paisUpdated = await Pais.findOne({ where: { id } }).then((pais) => {
      return pais.update({ deletedAt: Sequelize.fn('NOW') });
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    console.log(id);

    const pais = await Pais.findByPk(id);

    return pais;
  },
  pagination: async (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    const rows = await Pais.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      order: [['id', 'ASC']]
    });

    rows.slice(limit, offset);

    const count = await Pais.count({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      }
    });

    return { rows, count };
  },
  importCreate: async (paises) => {
    const paisesArray = await Pais.bulkCreate(paises);

    return paisesArray;
  },
  getByname: async (name) => {
    const pais = await Pais.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
          [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
        })
      }
    });

    return pais;
  },
  bulkCreate: async (paisesArray) => {
    const paises = await Pais.bulkCreate(paisesArray);
    return paises;
  }
};
