import { Router } from 'express'
import barriosController from '../controllers/barrio'
import upload from '../middlewares/upload'
const router = Router()

router.get('/', barriosController.get)
router.get('/pagination', barriosController.getPagination)
router.post('/', barriosController.create)
router.put('/put/:id', barriosController.update)
router.get('/comuna/:id', barriosController.findByIdComuna)
router.get('/get/:id', barriosController.findById)
router.post('/upload/sheet', upload.single('file'), barriosController.sheet)
router.delete('/delete/:id', barriosController.delete)
export default router
