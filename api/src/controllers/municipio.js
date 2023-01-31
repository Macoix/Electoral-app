import MunicipiosServices from '../services/municipio'
import DepartamentosServices from '../services/departamento'
import path from 'path'
import readXslsFile from 'read-excel-file/node'
import natsort from 'natsort'
import getPagination from '../utils/getPagination'
import getPagingData from '../utils/getPagingData'
import { off } from 'process'

const sorter = natsort()

export default {
  get: async (req, res) => {
    try {
      const municipios = await MunicipiosServices.getAll()

      res.status(200).json(municipios)
    } catch (error) {
      res.status(401).json({ error })
    }
  },
  create: async (req, res) => {
    try {
      const municipioObj = req.body
      const municipio = await MunicipiosServices.create(municipioObj)
      res.status(201).json({ municipio, message: 'Municipio creado exitosamente' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const municipioObj = req.body
      const municipio = await MunicipiosServices.update(id, municipioObj)

      res.status(201).json({ municipio, message: 'Municipio actualizado exitosamente' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params

      await MunicipiosServices.delete(id)

      res.status(200).json({ message: 'Municipio borrado satisfactoriamente' })
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' })
    }
  },
  findByIdDepartamento: async (req, res) => {
    try {
      const municipios = await MunicipiosServices.getByIdDepartamento(req)

      res.status(200).json({ municipios })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  findById: async (req, res) => {
    try {
      const municipio = await MunicipiosServices.getById(req)

      res.status(200).json({ municipio })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  pagination: async (req, res) => {
    const { page, size, query } = req.query
    const { limit, offset } = getPagination(page, size)

    try {
      const data = await MunicipiosServices.findAndCountAll(query)

      data.rows = data.rows.sort((a, b) => a.name.localeCompare(b.name)).slice(offset).slice(0, limit)

      const results = getPagingData(data, page, limit)

      res.status(200).json({ results })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  sheet: async (req, res) => {
    try {
      if (req.file === undefined) {
        return res.status(400).send('Please upload an excel file!')
      }
      const pathFile = path.normalize(
        `${__dirname}/../public/uploads/files/${req.file.filename}`
      )

      const rows = await readXslsFile(pathFile)

      rows.shift()

      const municipios = []

      let itemsProcessed = 0

      rows.forEach(async (row, index, array) => {
        const departamento = await DepartamentosServices.getByname(row[1])

        if (!departamento) {
          return res
            .status(500)
            .json({ message: `El departamento ${row[1]} no esta registrado` })
        }

        const municipio = {
          name: row[0],
          departamento_id: departamento.id,
          latitude: row[2],
          longitude: row[3]
        }

        const municipioCheck = await MunicipiosServices.getByname(municipio.name)

        if (municipioCheck == null) {
          municipios.push(municipio)
          itemsProcessed++
        } else {
          const id = municipioCheck.id
          await MunicipiosServices.update(id, departamento)
          itemsProcessed++
        }
        if (itemsProcessed === array.length) {
          await MunicipiosServices.bulkCreate(municipios)
          res.status(200).json({ message: 'Municipios subidos satisfactoriamente.' })
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      })
    }
  }
}
