import ocupacionController from '../controllers/ocupacion';
import { Router } from 'express';
import upload from '../middlewares/upload';

const router = Router();

router.get('/', ocupacionController.get);
router.get('/pagination', ocupacionController.pagination);
router.post('/', ocupacionController.create);
router.put('/put/:id', ocupacionController.update);
router.get('/get/:id', ocupacionController.getById);
router.delete('/delete/:id', ocupacionController.delete);
router.post('/upload/sheet', upload.single('file'), ocupacionController.sheet);

export default router;
