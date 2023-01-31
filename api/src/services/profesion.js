import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Profesion } = models;
export default {
  getAll: async (req, res) => {
    try {
      const profesiones = await Profesion.findAll({
        where: {
          deletedAt: {
            [Op.eq]: null
          }
        },
        order: [['name', 'ASC']]
      });
      return profesiones;
    } catch (error) {
      return error;
    }
  },
  create: async (req, res) => {
    const { body: name } = req;

    const profesion = await Profesion.create(name);

    return profesion;
  },
  update: async (id, profesionObj) => {
    const ProfesionUpdated = await Profesion.update(profesionObj, {
      where: { id }
    });

    const profesion = await Profesion.findByPk(id);

    return profesion;
  },
  delete: async (id, res) => {
    const profesionUpdated = await Profesion.findOne({ where: { id } }).then(
      (profesion) => {
        return profesion.update({ deletedAt: Sequelize.fn('NOW') });
      }
    );
  },
  paginate: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const profesiones = await Profesion.findAndCountAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      limit,
      offset,
      // include: { all: true, nested: true },
      order: [['name', 'ASC']]
    });
    return profesiones;
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const profesion = await Profesion.findByPk(id);

    return profesion;
  },
  getByname: async (name) => {
    const profesion = await Profesion.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
          [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
        })
      }
    });

    return profesion;
  },
  bulkCreate: async (profesionesArray) => {
    const profesiones = await Profesion.bulkCreate(profesionesArray);
    return profesiones;
  }
};
