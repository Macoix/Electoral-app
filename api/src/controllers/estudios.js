import EstudiosServices from '../services/estudios';
import path from 'path';
import readXslsFile from 'read-excel-file/node';

export default {
  get: async (req, res) => {
    try {
      const Estudios = await EstudiosServices.getAll();

      res.status(200).json(Estudios);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },
  create: async (req, res) => {
    try {
      const estudio = await EstudiosServices.create(req);

      res.status(201).json({ estudio, message: 'Profesion creado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const estudio = await EstudiosServices.update(req);

      res.status(201).json({ estudio, message: 'Profesion actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const estudio = await EstudiosServices.delete(id);

      res.status(200).json({ message: 'Estudios borrado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' });
    }
  },
  pagination: async (req, res) => {
    try {
      const estudios = await EstudiosServices.paginate(req);

      res.status(200).json({ estudios });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  findById: async (req, res) => {
    try {
      const estudio = await EstudiosServices.getById(req, res);

      res.status(200).json(estudio);
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  sheet: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an excel file!');
      }
      const pathFile = path.normalize(
        `${__dirname}/../public/uploads/files/${req.file.filename}`
      );

      const rows = await readXslsFile(pathFile);

      const estudios = [];

      let itemsProcessed = 0;

      rows.shift();

      rows.forEach(async (row, index, array) => {
        let estudio = {
          name: row[0]
        };

        const estudioCheck = await EstudiosServices.getByname(estudio.name);

        if (estudioCheck == null) {
          estudios.push(estudio);
          itemsProcessed++;
        }
        if (itemsProcessed === array.length) {
          const data = await EstudiosServices.bulkCreate(estudios);
          res.status(200).json({ message: 'Estudios subidos satisfactoriamente.' });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      });
    }
  }
};
