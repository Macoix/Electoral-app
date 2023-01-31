import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Votacion } = models;

export default {
  get: async () => {
    const votaciones = await Votacion.findAll({
      include: { all: true, nested: true },
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      order: [['id', 'ASC']]
    });

    return votaciones;
  },
  create: async (votacion) => {
    const newVotacion = await Votacion.create(votacion);

    return newVotacion;
  },
  update: async (id, votacionObj) => {
    const votacion = await Votacion.update(votacionObj, {
      where: { id }
    });

    return votacion;
  },
  delete: async (id, res) => {
    const votacionnUpdated = await Votacion.findOne({ where: { id } }).then((puesto) => {
      return puesto.update({ deletedAt: Sequelize.fn('NOW') });
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const votacion = await Votacion.findOne({
      where: { id }
    });

    return votacion;
  },
  paginate: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const votaciones = await Votacion.findAndCountAll({
      include: { all: true, nested: true },
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      limit,
      offset,
      order: [['id', 'ASC']]
    });
    return votaciones;
  },
  totalPuesto: async (puesto) => {
    const puestos = await Votacion.findAll({
      where: {
        puesto: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('puesto')), {
          [Op.iLike]: `%${puesto}%`
        })
      }
    });
    return puestos;
  }
};
