import PersonaServices from '../services/persona'
import PaisServices from '../services/pais'
import DepartamentoServices from '../services/departamento'
import MunicipioServices from '../services/municipio'
import ComunaServices from '../services/comuna'
import BarrioServices from '../services/barrio'
import generoServices from '../services/genero'
import ProfesionServices from '../services/profesion'
import EstudiosServices from '../services/estudios'
import VotacionServices from '../services/votacion'
import readXslsFile from 'read-excel-file/node'
import path from 'path'
import models from '../models'

const { PerfilProfesional } = models

export default {
  get: async (req, res) => {
    try {
      const personas = await PersonaServices.getAll()

      res.status(200).json(personas)
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  pagination: async (req, res) => {
    try {
      const personas = await PersonaServices.getPagination(req, res)

      res.status(200).json({ personas })
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  create: async (req, res) => {
    try {
      const {
        documento,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        fecha_nacimiento,
        email,
        telefono,
        idPais,
        idDepartamento,
        idMunicipio,
        idComuna,
        idBarrio,
        direccion,
        idGenero,
        latitude,
        longitude,
        profesion_id,
        estudios_id,
        ocupacion_id
      } = req.body

      let perfil_profesional_id = ''

      if (
        profesion_id !== undefined &&
        estudios_id !== undefined &&
        ocupacion_id !== undefined
      ) {
        console.log('entre aqui')
        const perfil = {
          profesion_id,
          estudios_id,
          ocupacion_id
        }
        perfilProfesional = await PerfilProfesional.create(perfil)

        const perfil_profesional_id = perfilProfesional.id
      }

      console.log(segundoNombre)
      console.log(segundoApellido)
      console.log(fecha_nacimiento)
      console.log(email)
      console.log(direccion)
      console.log(perfil_profesional_id)
      const personaObj = {
        documento,
        primerNombre,
        segundoNombre: segundoNombre !== undefined ? null : segundoNombre,
        primerApellido,
        segundoApellido: segundoApellido !== undefined ? null : segundoApellido,
        fecha_nacimiento: fecha_nacimiento !== undefined ? null : fecha_nacimiento,
        email: email !== undefined ? null : email,
        telefono,
        idPais,
        idDepartamento,
        idMunicipio,
        idComuna,
        idBarrio,
        direccion: direccion !== undefined ? null : direccion,
        idGenero,
        perfil_profesional_id:
          perfil_profesional_id !== undefined ? null : perfil_profesional_id,
        latitude,
        longitude
      }
      console.log('aqui llegue1')
      const checkPersona = await PersonaServices.getByDocument(documento)

      if (checkPersona) {
        return res.status(500).json({ message: 'Ya existe la persona' })
      }

      console.log('aqui llegue2')

      const persona = await PersonaServices.CreatePerson(personaObj)

      res.status(201).json({ message: 'persona creado exitosamente' })
    } catch (error) {
      res.status(500).json({ message: 'ha ocurrido un error', error })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const personaObj = req.body
      const { estudios_id, profesion_id, ocupacion, perfil_profesional_id } = req.body

      const perfil = {
        estudios_id,
        profesion_id,
        ocupacion
      }

      const perfil_profesional = PerfilProfesional.update(perfil, {
        where: { id: perfil_profesional_id }
      })

      const persona = await PersonaServices.update(id, personaObj)

      res.status(201).json({ message: 'persona actualizado exitosamente' })
    } catch (error) {
      res.status(400).json({ message: 'hubo un error' })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params

      const persona = await PersonaServices.delete(id, res)

      res.status(200).json({ message: 'Persona borrado satisfactoriamente' })
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' })
    }
  },
  findById: async (req, res) => {
    try {
      console.log(req.body, req.params)
      const persona = await PersonaServices.getById(req)

      res.status(200).json({ persona })
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  sheet: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an excel file!')
      }
      const pathFile = path.normalize(
        `${__dirname}/../public/uploads/files/${req.file.filename}`
      )

      const rows = await readXslsFile(pathFile)

      const personas = []

      let itemsProcessed = 0

      rows.shift()

      rows.forEach(async (row, index, array) => {
        const pais = await PaisServices.getByname(row[8])
        const departamento = await DepartamentoServices.getByname(row[9])
        const municipio = await MunicipioServices.getByname(row[10])
        const comuna = await ComunaServices.getByname(row[11])
        const barrio = await BarrioServices.getByname(row[12])
        const genero = await generoServices.getByName(row[14])
        const profesion = await ProfesionServices.getByname(row[16])
        const estudios = await EstudiosServices.getByname(row[15])

        function ExcelDateToJSDate(serial) {
          var utc_days = Math.floor(serial - 25569)
          var utc_value = utc_days * 86400
          var date_info = new Date(utc_value * 1000)

          var fractional_day = serial - Math.floor(serial) + 0.0000001

          var total_seconds = Math.floor(86400 * fractional_day)

          var seconds = total_seconds % 60

          total_seconds -= seconds

          var hours = Math.floor(total_seconds / (60 * 60))
          var minutes = Math.floor(total_seconds / 60) % 60

          return new Date(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate(),
            hours,
            minutes,
            seconds
          )
        }
        const perfil = {
          profesion_id: profesion.id,
          ocupacion: row[17],
          estudios_id: estudios.id
        }

        const perfilProfesional = await PerfilProfesional.create(perfil)

        const perfil_profesional_id = perfilProfesional.id

        let persona = {
          documento: row[0],
          primerNombre: row[1],
          segundoNombre: row[2],
          primerApellido: row[3],
          segundoApellido: row[4],
          email: row[6],
          fecha_nacimiento: ExcelDateToJSDate(row[5]),
          telefono: row[7],
          idPais: pais.id,
          idDepartamento: departamento.id,
          idMunicipio: municipio.id,
          idComuna: comuna.id,
          idBarrio: barrio.id,
          direccion: row[13],
          idGenero: genero.id,
          perfil_profesional_id
        }

        const personaCheck = await PersonaServices.getByDocument(persona.documento)

        if (personaCheck == null) {
          personas.push(persona)
          itemsProcessed++
        } else if (personaCheck) {
          await PersonaServices.update(personaCheck.id, persona)
          itemsProcessed++
        }

        if (itemsProcessed === array.length) {
          const data = await PersonaServices.bulkCreate(personas)
          res.status(200).send({
            message: 'Personas Subidos satisfactoriamente'
          })
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo subir el archivo'
      })
    }
  },
  findByDocument: async (req, res) => {
    const { document } = req.params
    console.log(document)
    const persona = await PersonaServices.getByDocument(document)
    res.status(200).json(persona)
  },
  findByEmail: async (req, res) => {
    try {
      const { email } = req.params
      const persona = await PersonaServices.getByEmail(email)
      res.status(200).json(persona)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  searchByCriterios: async (req, res) => {
    try {
      const params = req.query
      if (Object.keys(params).length === 0) {
        return res.status(500).json({ message: 'Parametros vacios' })
      }
      const votantes = {}
      const personasFetch = await PersonaServices.searchByCriterios(params)
      const totalVotantes = await PersonaServices.totalPersonas()
      votantes['personas'] = personasFetch
      votantes['total_votantes'] = totalVotantes
      if (params.idPais) {
        const totalVotantesPais = await PersonaServices.totalVotantesPais(params.idPais)
        votantes['total_votantes_pais'] = totalVotantesPais
      }
      if (params.idDepartamento) {
        const totalVotantesDepartamento = await PersonaServices.totalVotantesDepartamento(
          params.idDepartamento
        )
        votantes['total_votantes_departamento'] = totalVotantesDepartamento
      }
      if (params.idMunicipio) {
        const totalVotantesMunicipio = await PersonaServices.totalVotantesMunicipio(
          params.idMunicipio
        )
        votantes['total_votantes_municipio'] = totalVotantesMunicipio
      }
      if (params.idComuna) {
        const totalVotantesComuna = await PersonaServices.totalVotantesComuna(
          params.idComuna
        )
        votantes['total_votantes_comuna'] = totalVotantesComuna
      }
      if (params.idBarrio) {
        const totalVotantesBarrio = await PersonaServices.totalVotantesBarrio(
          params.idBarrio
        )
        votantes['total_votantes_barrio'] = totalVotantesBarrio
      }
      if (params.idGenero) {
        const totalVotantesGenero = await PersonaServices.totalVotantesGenero(
          params.idGenero
        )
        votantes['total_votantes_genero'] = totalVotantesGenero
      }
      if (params.puesto) {
        let suma = 0
        const totalVotantesPuesto = await PersonaServices.totalVotantesPuesto(
          params.puesto
        )
        const puestos = await VotacionServices.totalPuesto(params.puesto)
        puestos.map((puesto) => {
          suma = suma + puesto.Total
        })
        votantes['total_posibles_votantes_puesto'] = suma
        votantes['total_votantes_puesto'] = totalVotantesPuesto
      }
      if (params.mesa) {
        const totalVotantesMesa = await PersonaServices.totalVotantesMesa(params.mesa)
        votantes['total_votantes_mesa'] = totalVotantesMesa
      }
      if (params.idRol) {
        const totalVotantesRol = await PersonaServices.totalVotantesRol(params.idRol)
        votantes['total_votantes_rol'] = totalVotantesRol
      }
      console.log(votantes)
      const votantesLength = votantes.personas.length
      if (votantesLength) {
        res.status(200).json({ votantes, message: 'Busqueda realizada con exito' })
      } else {
        res.status(204).json({ message: 'No se encontraron resultados' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Ocurrio un error' })
    }
  }
}
