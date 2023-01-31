import PaisServices from '../services/pais';
import readXslsFile from 'read-excel-file/node';
import path from 'path';
import natsort from 'natsort';

const sorter = natsort();

export default {
  get: async (req, res) => {
    try {
      const paises = await PaisServices.getAll();

      res.status(200).json(paises);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },
  getPagination: async (req, res) => {
    try {
      const paises = await PaisServices.pagination(req, res);

      paises.rows.sort((a, b) => sorter(a.name, b.name));

      res.status(200).json({ paises });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  create: async (req, res) => {
    try {
      const paisObj = req.body;
      const pais = await PaisServices.create(paisObj);

      res.status(201).json({ message: 'pais creado exitosamente' });
    } catch (error) {
      res.status(400).json({ message: 'ha ocurrido un error' });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const paisObj = req.body;
      const pais = await PaisServices.update(id, paisObj);

      res.status(201).json({ message: 'pais actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ message: 'hubo un error' });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const municipio = await PaisServices.delete(id);

      res.status(200).json({ message: 'Pais borrado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' });
    }
  },
  findById: async (req, res) => {
    try {
      const pais = await PaisServices.getById(req);

      res.status(200).json({ pais });
    } catch (error) {
      res.status(500).json({ error });
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

      const paises = [];

      let itemsProcessed = 0;

      rows.forEach(async (row, index, array) => {
        let pais = {
          name: row[0],
          code: row[1],
          latitude: row[2],
          longitude: row[3]
        };

        const paisCheck = await PaisServices.getByname(pais.name);

        if (paisCheck == null) {
          paises.push(pais);
          itemsProcessed++;
        } else {
          const id = paisCheck.id;
          await PaisServices.update(id, pais);
          itemsProcessed++;
        }
        if (itemsProcessed === array.length) {
          const data = await PaisServices.bulkCreate(paises);
          res.status(200).send({
            message: 'Paises Subidos satisfactoriamente'
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
