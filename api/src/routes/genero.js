import generoController from '../controllers/genero'
import { Router } from 'express'
import upload from '../middlewares/upload'

const router = Router()

router.get('/', generoController.get)
router.get('/pagination', generoController.pagination)
router.post('/', generoController.create)
router.put('/put/:id', generoController.update)
router.get('/get/:id', generoController.getById)
router.delete('/delete/:id', generoController.delete)
router.post('/upload/sheet', upload.single('file'), generoController.sheet)

export default router
