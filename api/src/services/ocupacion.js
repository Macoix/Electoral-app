import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Ocupacion } = models;
export default {
  getAll: async (req) => {
    const ocupaciones = await Ocupacion.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      }
    });

    return ocupaciones;
  },
  create: async (req) => {
    const { body: name } = req;

    const ocupacion = await Ocupacion.create(name);

    return ocupacion;
  },
  update: async (id, ocupacion) => {
    const ocupacionUpdated = await Ocupacion.update(ocupacion, {
      where: {
        id
      }
    });

    const ocupacionN = await Ocupacion.findOne({ where: { id } });

    return ocupacionN;
  },
  delete: async (id) => {
    const ocupacionUpdated = await Ocupacion.findOne({ where: { id } }).then(
      (ocupacion) => {
        return ocupacion.update({ deletedAt: Sequelize.fn('NOW') });
      }
    );
  },
  getById: async (req) => {
    const { id } = req.params;

    const ocupacion = Ocupacion.findOne({ where: { id } });

    return ocupacion;
  },
  getPagination: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const rows = await Ocupacion.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      order: [['name', 'ASC']]
    });

    rows.slice(limit, offset);

    const count = await Ocupacion.count({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      }
    });

    return { rows, count };
  },
  getByName: async (name) => {
    const ocupacion = await Ocupacion.findOne({
      where: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
        [Op.iLike]: `%${name}%`
      })
    });

    return ocupacion;
  },
  bulkCreate: async (ocupacionesArray) => {
    const ocupacion = await Ocupacion.bulkCreate(ocupacionesArray);
    return ocupacion;
  }
};
