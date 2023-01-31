import ocupacionServices from '../services/ocupacion';
import path from 'path';
import readXslsFile from 'read-excel-file/node';
import natsort from 'natsort';

const sorter = natsort();

export default {
  get: async (req, res) => {
    try {
      const ocupaciones = await ocupacionServices.getAll();
      res.status(200).json(ocupaciones);
    } catch (error) {
      res.status(404).json({ error });
    }
  },
  create: async (req, res) => {
    try {
      const ocupacion = await ocupacionServices.create(req);

      res.status(201).json({ message: 'Ocupacion creado correctamente' });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { body: name } = req;

      const ocupacion = await ocupacionServices.update(id, name);

      res.status(200).json({ ocupacion, message: 'Ambito actualizado con exito' });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const ocupacion = await ocupacionServices.delete(id);

      res.status(200).json({ message: 'Ocupacion borrado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' });
    }
  },
  getById: async (req, res) => {
    try {
      const ocupacion = await ocupacionServices.getById(req);

      res.status(200).json({ ocupacion });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  pagination: async (req, res) => {
    try {
      const ocupaciones = await ocupacionServices.getPagination(req, res);

      ocupaciones.rows.sort((a, b) => {
        sorter(a.name, b.name);
      });

      res.status(200).json({ ocupaciones });
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

      const ocupaciones = [];

      let itemsProcessed = 0;

      rows.forEach(async (row, index, array) => {
        let ocupacion = {
          name: row[0]
        };

        const ocupacionCheck = await ocupacionServices.getByName(ocupacion.name);
        console.log(ocupacionCheck);
        if (ocupacionCheck == null) {
          ocupaciones.push(ocupacion);
          itemsProcessed++;
        } else {
          const id = ocupacionCheck.id;
          await ocupacionServices.update(id, ocupacion);
          itemsProcessed++;
        }
        if (itemsProcessed === array.length) {
          const data = await ocupacionServices.bulkCreate(ocupaciones);
          res.status(200).send({
            message: 'Ocupaciones subidos satisfactoriamente'
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
