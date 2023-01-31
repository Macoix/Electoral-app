import DepartamentosServices from '../services/departamento';
import PaisServices from '../services/pais';
import path from 'path';
import readXslsFile from 'read-excel-file/node';
import natsort from 'natsort';

const sorter = natsort();

export default {
  get: async (req, res) => {
    try {
      const departamentos = await DepartamentosServices.getAll();

      departamentos.sort((a, b) => sorter(a.name, b.name));

      console.log(departamentos);

      res.status(200).json(departamentos);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },
  create: async (req, res) => {
    try {
      const departamentoObj = req.body;

      const departamento = await DepartamentosServices.create(departamentoObj);

      res.status(201).json({ departamento, message: 'Departamento creado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const departamentoObj = req.body;

      const departamento = await DepartamentosServices.update(id, departamentoObj);
      console.log(departamento);
      res
        .status(201)
        .json({ departamento, message: 'Departamento actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const departamento = await DepartamentosServices.delete(id);

      res.status(200).json({ message: 'Departamento borrado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' });
    }
  },
  findByIdPais: async (req, res) => {
    try {
      const departamentos = await DepartamentosServices.getByIdPais(req);

      res.status(200).json({ departamentos });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  findById: async (req, res) => {
    try {
      const departamento = await DepartamentosServices.getById(req);

      res.status(200).json({ departamento });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  pagination: async (req, res) => {
    try {
      const departamentos = await DepartamentosServices.getPagination(req);

      departamentos.rows.sort((a, b) => sorter(a.name, b.name));

      res.status(200).json({ departamentos });
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

      const departamentos = [];

      let itemsProcessed = 0;

      rows.shift();

      rows.forEach(async (row, index, array) => {
        const pais = await PaisServices.getByname(row[1]);
        if (!pais) {
          return res.status(500).json({ message: `El pais ${row[1]} no existe` });
        }
        let departamento = {
          name: row[0],
          pais_id: pais.id,
          latitude: row[2],
          longitude: row[3]
        };

        const departamentoCheck = await DepartamentosServices.getByname(row[0]);
        console.log(departamentoCheck);
        if (departamentoCheck == null) {
          departamentos.push(departamento);
          itemsProcessed++;
        } else {
          const id = departamentoCheck.id;
          await DepartamentosServices.update(id, departamento);
          itemsProcessed++;
        }

        if (itemsProcessed === array.length) {
          const data = await DepartamentosServices.bulkCreate(departamentos);
          res.status(200).json({ message: 'Departamentos subidas satisfactoriamente.' });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      });
    }
  }
};
