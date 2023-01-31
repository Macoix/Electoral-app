import { Router } from 'express';
import comunasController from '../controllers/comuna';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', comunasController.get);
router.get('/pagination', comunasController.pagination);
router.post('/', comunasController.create);
router.put('/put/:id', comunasController.update);
router.get('/municipio/:id', comunasController.findByIdMunicipio);
router.get('/get/:id', comunasController.findById);
router.post('/upload/sheet', upload.single('file'), comunasController.sheet);
router.delete('/delete/:id', comunasController.delete);
export default router;
