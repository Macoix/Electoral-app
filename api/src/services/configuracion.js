import models from '../models';
import getPagination from '../utils/getPagination'

const { Configuracion } = models;
export default {
  get: async (req, res) => {
    try {
      const configuracion = await Configuracion.findAll();

      return configuracion;
    } catch (error) {
      return error;
    }
  },
  create: async (req, res) => {
    const { body: name } = req;

    const configuracion = await Configuracion.create(name);

    return configuracion;
  },
  update: async (id, config) => {
    console.log(id, config);
    const configuracionUpdated = await Configuracion.update(config, {
      where: { id }
    });

    const configuracion = await Configuracion.findByPk(id);

    return configuracion;
  }
};
