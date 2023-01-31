import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Departamento, Pais } = models;
export default {
  getAll: async (req, res) => {
    try {
      const departamentos = await Departamento.findAll({
        where: {
          deletedAt: {
            [Op.eq]: null
          }
        },
        include: {
          model: Pais,
          as: 'pais'
        },
        order: [['name', 'ASC']]
      });

      return departamentos;
    } catch (error) {
      return error;
    }
  },
  create: async (departamentoObj) => {
    const departamento = await Departamento.create(departamentoObj);

    return departamento;
  },
  update: async (id, departamentoObj) => {
    console.log(id);
    console.log(departamentoObj);
    const departamentoUpdated = await Departamento.update(departamentoObj, {
      where: { id }
    });

    const departamento = await Departamento.findByPk(id);

    return departamento;
  },
  delete: async (id) => {
    const departamentoUpdated = await Departamento.findOne({ where: { id } }).then(
      (departamento) => {
        return departamento.update({ deletedAt: Sequelize.fn('NOW') });
      }
    );
  },
  getByIdPais: async (req, res) => {
    const { id } = req.params;

    const departamento = await Departamento.findAll({ where: { pais_id: id } });

    return departamento;
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const departamento = await Departamento.findOne({
      where: { id },
      include: {
        model: Pais,
        as: 'pais'
      }
    });

    return departamento;
  },
  getPagination: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const rows = await Departamento.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      },
      include: {
        model: Pais,
        as: 'pais'
      },
      order: [['name', 'ASC']]
    });

    rows.slice(limit, offset);

    const count = await Departamento.count();

    return { rows, count };
  },
  getByname: async (name) => {
    console.log(name);
    const departamento = await Departamento.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
          [Op.iLike]: Sequelize.fn('unaccent', `%${name}%`)
        })
      }
    });

    return departamento;
  },
  bulkCreate: async (departamentosObj) => {
    const departamentos = await Departamento.bulkCreate(departamentosObj);

    return departamentos;
  }
};
