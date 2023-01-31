import ComunaServices from '../services/comuna'
import MunicipioServices from '../services/municipio'
import path from 'path'
import readXslsFile from 'read-excel-file/node'
import natsort from 'natsort'
import getPagination from '../utils/getPagination'
import getPagingData from '../utils/getPagingData'

const sorter = natsort()

export default {
  get: async (req, res) => {
    try {
      const comunas = await ComunaServices.getAll()

      const comunasSorted = comunas.sort((a, b) => sorter(a.name, b.name))

      res.status(200).json(comunasSorted)
    } catch (error) {
      res.status(401).json({ error })
    }
  },
  create: async (req, res) => {
    const { name, municipio_id, ambito } = req.body
    const comuna = req.body
    if (!name || !municipio_id || !ambito) return res.sendStatus(400)
    try {
      const comunaCreated = await ComunaServices.create(comuna)

      res
        .status(201)
        .json({ comuna: comunaCreated, message: 'Comuna creado exitosamente' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const comunaObj = req.body

      const comuna = await ComunaServices.update(id, comunaObj)

      res
        .status(201)
        .json({ comuna, message: 'Comuna actualizado exitosamente' })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params

      await ComunaServices.delete(id)

      res.status(200).json({ message: 'Comuna borrado satisfactoriamente' })
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' })
    }
  },
  findByIdMunicipio: async (req, res) => {
    try {
      const comunas = await ComunaServices.getByIdMunicipio(req)

      const comunasSorted = comunas.sort((a, b) => sorter(a.name, b.name))

      res.status(200).json({ comunasSorted })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  findById: async (req, res) => {
    try {
      const comuna = await ComunaServices.getById(req)

      res.status(200).json({ comuna })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  pagination: async (req, res) => {
    const { page, size, query } = req.query
    const { limit, offset } = getPagination(page, size)
    try {
      const data = await ComunaServices.findCountAll(query)

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
        path.join(__dirname, `../public/uploads/files/${req.file.filename}`)
      )

      const rows = await readXslsFile(pathFile)

      rows.shift()

      const comunas = []

      let itemsProcessed = 0

      rows.forEach(async (row, index, array) => {
        const municipio = await MunicipioServices.getByname(row[1])
        if (!municipio) {
          return res
            .status(500)
            .json({ message: `El municipio ${row[1]} no esta registrado` })
        }
        const comuna = {
          name: row[0],
          municipio_id: municipio.id,
          ambito: row[2],
          latitude: row[3],
          longitude: row[4]
        }

        const comunaCheck = await ComunaServices.getByname(comuna.name)

        if (comunaCheck == null) {
          comunas.push(comuna)
          itemsProcessed++
        } else {
          const id = comunaCheck.id
          await ComunaServices.update(id, comuna)
          itemsProcessed++
        }

        if (itemsProcessed === array.length) {
          await ComunaServices.bulkCreate(comunas)
          res
            .status(200)
            .json({ message: 'Comunas subidas satisfactoriamente.' })
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      })
    }
  }
}
