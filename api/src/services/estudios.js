import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Estudios } = models;
export default {
  getAll: async (req, res) => {
    try {
      const estudios = await Estudios.findAll({
        // where: {
        //   deletedAt: {
        //     [Op.eq]: null
        //   }
        // }
        order: [['name', 'ASC']]
      });
      return estudios;
    } catch (error) {
      return error;
    }
  },
  create: async (req, res) => {
    const { body: name } = req;

    const estudio = await Estudios.create(name);

    return estudio;
  },
  update: async (req, res) => {
    const { id } = req.params;

    const estudioUpdated = await Estudios.update(req.body, {
      where: { id }
    });

    const estudio = await Estudios.findByPk(id);

    return estudio;
  },
  delete: async (id, res) => {
    const estudiosUpdated = await Estudios.findOne({ where: { id } }).then((estudios) => {
      return estudios.update({ deletedAt: Sequelize.fn('NOW') });
    });
  },
  paginate: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const estudios = await Estudios.findAndCountAll({
      // where: {
      //   deletedAt: {
      //     [Op.eq]: null
      //   }
      // },
      limit,
      offset,
      // include: { all: true, nested: true },
      order: [['id', 'ASC']]
    });
    return estudios;
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const estudio = await Estudios.findByPk(id);

    return estudio;
  },
  getByname: async (name) => {
    const estudio = await Estudios.findOne({
      where: {
        // deletedAt: {
        //   [Op.eq]: null
        // },
        name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
          [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
        })
      }
    });

    return estudio;
  },
  bulkCreate: async (estudiosArray) => {
    const estudios = await Estudios.bulkCreate(estudiosArray);

    return estudios;
  }
};
