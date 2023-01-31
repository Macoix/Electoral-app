import models from '../models';
import getPagination from '../utils/getPagination'

const { Rol } = models;
export default {
  getAll: async (req, res) => {
    try {
      const roles = await Rol.findAll({
        // include: {
        //   model: Comuna,
        //   as: 'comuna'
        // }
      });

      return roles;
    } catch (error) {
      return error;
    }
  },
  create: async (req, res) => {
    const { body: name } = req;

    const rol = await Rol.create(name);

    return rol;
  },
  update: async (req, res) => {
    const { id } = req.params;

    const rolUpdated = await Rol.update(req.body, {
      where: { id }
    });

    const rol = await Rol.findByPk(id);

    return rol;
  },
  paginate: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const roles = await Rol.findAndCountAll({
      limit,
      offset,
      // include: { all: true, nested: true },
      order: [['id', 'ASC']]
    });
    return roles;
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);

    return rol;
  }
};
