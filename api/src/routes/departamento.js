import { Router } from 'express';
import departamentoController from '../controllers/departamento';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', departamentoController.get);
router.get('/pagination', departamentoController.pagination);
router.post('/', departamentoController.create);
router.put('/put/:id', departamentoController.update);
router.get('/pais/:id', departamentoController.findByIdPais);
router.get('/get/:id', departamentoController.findById);
router.post('/upload/sheet', upload.single('file'), departamentoController.sheet);
router.delete('/delete/:id', departamentoController.delete);
export default router;
