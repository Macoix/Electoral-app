import express from 'express'
import users from './users'
import auth from './auth'
import generos from './genero'
import barrio from './barrio'
import comuna from './comuna'
import configuracion from './configuracion'
import departamento from './departamento'
import documento from './documento'
import municipio from './municipio'
import pais from './pais'
import persona from './persona'
import profesion from './profesion'
import rol from './rol'
import votacion from './votacion'
import estudio from './estudios'
import terminos from './terminos'
import ocupacion from './ocupacion'

// import verifyJWT from '../middlewares/verifyJWT'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is online.' })
})
router.use('/auth', auth)
router.use('/users', users)
router.use('/generos', generos)
router.use('/barrios', barrio)
router.use('/comunas', comuna)
router.use('/configuracion', configuracion)
router.use('/departamentos', departamento)
router.use('/documentos', documento)
router.use('/municipios', municipio)
router.use('/paises', pais)
router.use('/personas', persona)
router.use('/profesiones', profesion)
router.use('/roles', rol)
router.use('/votaciones', votacion)
router.use('/estudios', estudio)
router.use('/terminos', terminos)
router.use('/ocupaciones', ocupacion)

export default router
