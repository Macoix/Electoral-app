import generoServices from '../services/genero'
import path from 'path'
import readXslsFile from 'read-excel-file/node'

export default {
  get: async (req, res) => {
    try {
      const generos = await generoServices.getAll()
      res.status(200).json(generos)
    } catch (error) {
      res.status(401).json({ error })
    }
  },
  create: async (req, res) => {
    try {
      await generoServices.createAmbito(req)

      res.status(200).json({ message: 'Ambito creado correctamente' })
    } catch (error) {
      res.status(401).json({ error })
    }
  },
  update: async (req, res) => {
    try {
      // const { id } = req.params

      // const { body: name } = req

      const genero = await generoServices.update(req)

      res.status(200).json({ genero, message: 'Ambito actualizado con exito' })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params

      await generoServices.delete(id)

      res.status(200).json({ message: 'Ambito borrado satisfactoriamente' })
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' })
    }
  },
  getById: async (req, res) => {
    try {
      const genero = await generoServices.getById(req)

      res.status(200).json({ genero })
    } catch (error) {
      res.status(200).json({ error })
    }
  },
  pagination: async (req, res) => {
    try {
      const generos = await generoServices.getPagination(req, res)

      res.status(200).json({ generos })
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

      const generos = []

      let itemsProcessed = 0

      rows.forEach(async (row, index, array) => {
        let genero = {
          name: row[0]
        }

        const generoCheck = await generoServices.getByName(genero.name)
        console.log(generoCheck)
        if (generoCheck == null) {
          generos.push(genero)
          itemsProcessed++
        } else {
          const id = generoCheck.id
          await generoServices.update(id, genero)
          itemsProcessed++
        }
        if (itemsProcessed === array.length) {
          const data = await generoServices.bulkCreate(generos)
          res.status(200).send({
            message: 'Generos Subidos satisfactoriamente'
          })
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      })
    }
  }
}
