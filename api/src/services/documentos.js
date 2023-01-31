import models from '../models';
import getPagination from '../utils/getPagination'
import Sequelize, { Op } from 'sequelize';

const { Documento } = models;

export default {
  get: async (req, res) => {
    const documentos = Documento.findAll();

    return documentos;
  },
  createDocumento: async (req) => {
    const { body: name } = req;

    const documento = await Documento.create(name);

    return documento;
  },
  update: async (req, res) => {
    const { id } = req.params;

    const { body: name } = req;

    const documentoUpdated = await Documento.update(name, {
      where: {
        id
      }
    });

    const documento = await Documento.findOne({ where: { id } });

    return documento;
  },
  getById: async (req) => {
    const { id } = req.params;

    const documento = Documento.findOne({ where: { id } });

    return documento;
  },
  getPagination: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const documentos = await Documento.findAndCountAll({
      limit,
      offset,
      include: { all: true, nested: true },
      order: [['id', 'ASC']]
    });
    return documentos;
  },
  getByname: async (name) => {
    const documento = await Documento.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        },
        name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
          [Op.iLike]: `%${name}%`
        })
      }
    });

    return documento;
  }
};
