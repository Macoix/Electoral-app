import models from '../models';
import getPagination from '../utils/getPagination'

const { PerfilProfesional } = models;
export default {
  getAll: async (req, res) => {
    try {
      const profesiones = await PerfilProfesional.findAll();
      return profesiones;
    } catch (error) {
      return error;
    }
  },
  create: async (perfilObj) => {
    const perfil = await PerfilProfesional.create(perfilObj);

    return perfil;
  },
  update: async (req, res) => {
    const { id } = req.params;

    const ProfesionUpdated = await PerfilProfesional.update(req.body, {
      where: { id }
    });

    const profesion = await PerfilProfesional.findByPk(id);

    return profesion;
  },
  paginate: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const profesiones = await PerfilProfesional.findAndCountAll({
      limit,
      offset,
      // include: { all: true, nested: true },
      order: [['id', 'ASC']]
    });
    return profesiones;
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const profesion = await PerfilProfesional.findByPk(id);

    return profesion;
  }
};
