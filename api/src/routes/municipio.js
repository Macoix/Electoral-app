import { Router } from 'express';
import municipioController from '../controllers/municipio';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', municipioController.get);
router.get('/pagination', municipioController.pagination);
router.post('/', municipioController.create);
router.put('/put/:id', municipioController.update);
router.get('/departamento/:id', municipioController.findByIdDepartamento);
router.get('/get/:id', municipioController.findById);
router.post('/upload/sheet', upload.single('file'), municipioController.sheet);
router.delete('/delete/:id', municipioController.delete);
export default router;
