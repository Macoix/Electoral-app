import { Router } from 'express';
import profesionController from '../controllers/profesion';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', profesionController.get);
router.get('/pagination', profesionController.pagination);
router.post('/', profesionController.create);
router.put('/put/:id', profesionController.update);
router.get('/get/:id', profesionController.findById);
router.post('/upload/sheet', upload.single('file'), profesionController.sheet);
router.delete('/delete/:id', profesionController.delete);

export default router;
