import models from '../models';

const { Terminos } = models;

export default {
  get: async () => {
    const terminos = await Terminos.findOne();

    return terminos;
  },
  update: async (terminos) => {
    const terminosUpdated = await Terminos.update(terminos, {
      where: { id: 1 }
    });

    const termino = await Terminos.findByPk(1);

    return termino;
  }
};
