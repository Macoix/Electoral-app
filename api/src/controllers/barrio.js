import BarrioServices from '../services/barrio'
import ComunaServices from '../services/comuna'
import moment from 'moment'
import natsort from 'natsort'
import path from 'path'
import readXslsFile from 'read-excel-file/node'
import getPagination from '../utils/getPagination'
import getPagingData from '../utils/getPagingData'

const sorter = natsort()

export default {
  get: async (req, res) => {
    try {
      const barrios = await BarrioServices.getAll()
      if (!barrios) return res.sendStatus(404)
      barrios.sort((a, b) => sorter(a.name, b.name))

      res.status(200).json(barrios)
    } catch (error) {
      res.status(401).json({ error })
    }
  },
  create: async (req, res) => {
    try {
      const barrioPayload = req.body

      const barrioCreated = await BarrioServices.create(barrioPayload)

      res
        .status(201)
        .json({ barrio: barrioCreated, message: 'Barrio creado exitosamente' })
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  update: async (req, res) => {
    try {
      const barrioObj = req.body

      const { id } = req.params

      const barrio = await BarrioServices.update(id, barrioObj)

      res
        .status(200)
        .json({ barrio, message: 'Barrio actualizado exitosamente' })
    } catch (error) {
      res.status(500).json({ error: 'hubo un error' })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params
      // console.log(id)
      const momento = moment().format()

      await BarrioServices.delete(id, momento)

      res.status(200).json({ message: 'Barrio borrado satisfactoriamente' })
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' })
    }
  },
  findByIdComuna: async (req, res) => {
    const { id } = req.params
    try {
      const barrios = await BarrioServices.getByIdComuna(id)
      if (!barrios || barrios.length === 0) return res.sendStatus(404)
      res.status(200).json({ barrios })
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params
      const barrio = await BarrioServices.getByIdBarrio(id)
      if (!barrio) return res.sendStatus(404)
      res.status(200).json({ barrio })
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  getPagination: async (req, res) => {
    const { page, size, query } = req.query
    const { limit, offset } = getPagination(page, size)

    try {
      const data = await BarrioServices.findCountAll(limit, offset, query)

      // data.rows.sort((a, b) => sorter(a.name, b.name))
      const results = getPagingData(data, page, limit)

      res.status(200).json({ results })
    } catch (error) {
      res.status(200).json({
        error: error.message || 'Algo ocurrio en el servidor'
      })
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

      const barrios = []

      let itemsProcessed = 0

      await rows.forEach(async (row, index, array) => {
        const comuna = await ComunaServices.getByname(row[1])

        if (!comuna) {
          return res
            .status(500)
            .json({ message: `El comuna ${row[1]} no esta registrado` })
        }

        const barrio = {
          name: row[0],
          comuna_id: comuna.id,
          latitude: row[2],
          longitude: row[3]
        }

        const barrioCheck = await BarrioServices.getByname(barrio.name)
        if (barrioCheck == null) {
          barrios.push(barrio)
          itemsProcessed++
        } else {
          const id = barrioCheck.id
          await BarrioServices.update(id, barrio)
          itemsProcessed++
        }

        if (itemsProcessed === array.length) {
          await BarrioServices.bulkCreate(barrios)
          res
            .status(200)
            .json({ message: 'Barrios subidos satisfactoriamente' })
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      })
    }
  }
}
