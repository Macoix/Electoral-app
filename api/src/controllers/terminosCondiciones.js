import TerminosServices from '../services/terminosCondiciones';

export default {
  get: async (req, res) => {
    try {
      const terminos = await TerminosServices.get();
      return res.status(200).json(terminos);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const terminos = req.body;
      const termino = await TerminosServices.update(terminos);
      // console.log(termino);
      return res
        .status(200)
        .json({ termino, message: 'Terminos y condiciones actualizadas con exito' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
