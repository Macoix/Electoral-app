import ConfigServices from '../services/configuracion';
import path from 'path';

export default {
  get: async (req, res) => {
    try {
      const config = await ConfigServices.get();

      res.status(200).json(config);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },
  create: async (req, res) => {
    try {
      const config = await ConfigServices.create(req);

      res.status(201).json({ config, message: 'Configuración creado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const config = req.body;

      const configuracion = await ConfigServices.update(1, config);

      res
        .status(201)
        .json({ configuracion, message: 'Configuracion actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  changeImg: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an img');
      }

      console.log('entre aqui');

      const config = {
        campana_img: `/images/${req.file.filename}`
      };

      const configuracion = await ConfigServices.update(1, config);

      res.status(201).json({ configuracion, message: 'imagen actualizada exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  changeSlogan: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an img');
      }

      console.log('entre aqui');

      const config = {
        slogan: `/images/${req.file.filename}`
      };

      const configuracion = await ConfigServices.update(1, config);

      res.status(201).json({ configuracion, message: 'Slogan actualizada exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  changeTexto: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an img');
      }

      console.log('entre aqui');

      const config = {
        text: `/images/${req.file.filename}`
      };

      const configuracion = await ConfigServices.update(1, config);

      res.status(201).json({ configuracion, message: 'Texto actualizada exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
