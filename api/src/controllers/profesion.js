import ProfesionServices from '../services/profesion';
import readXslsFile from 'read-excel-file/node';
import path from 'path';

export default {
  get: async (req, res) => {
    try {
      const profesiones = await ProfesionServices.getAll();

      res.status(200).json(profesiones);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },
  create: async (req, res) => {
    try {
      const profesion = await ProfesionServices.create(req);

      res.status(201).json({ profesion, message: 'Profesion creado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const profesionObj = req.body;
      const profesion = await ProfesionServices.update(id, profesionObj);

      res.status(201).json({ profesion, message: 'Profesion actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const persona = await ProfesionServices.delete(id);

      res.status(200).json({ message: 'Profesion borrado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' });
    }
  },
  pagination: async (req, res) => {
    try {
      const profesiones = await ProfesionServices.paginate(req);

      res.status(200).json({ profesiones });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  findById: async (req, res) => {
    try {
      const profesion = await ProfesionServices.getById(req, res);

      res.status(200).json(profesion);
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

      rows.shift();

      const profesiones = [];

      let itemsProcessed = 0;

      rows.forEach(async (row, index, array) => {
        let profesion = {
          name: row[0]
        };

        const profesionCheck = await ProfesionServices.getByname(profesion.name);

        if (profesionCheck == null) {
          profesiones.push(profesion);
          itemsProcessed++;
        }
        if (itemsProcessed === array.length) {
          const data = await ProfesionServices.bulkCreate(profesiones);
          res.status(200).send({
            message: 'Profesiones Subidos satisfactoriamente'
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      });
    }
  }
};
