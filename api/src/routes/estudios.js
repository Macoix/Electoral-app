import { Router } from 'express';
import estudiosController from '../controllers/estudios';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', estudiosController.get);
router.get('/pagination', estudiosController.pagination);
router.post('/', estudiosController.create);
router.put('/put/:id', estudiosController.update);
router.get('/get/:id', estudiosController.findById);
router.post('/upload/sheet', upload.single('file'), estudiosController.sheet);
router.delete('/delete/:id', estudiosController.delete);
export default router;
