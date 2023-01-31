import { Router } from 'express';
import paisController from '../controllers/pais';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', paisController.get);
router.get('/pagination', paisController.getPagination);
router.post('/', paisController.create);
router.put('/put/:id', paisController.update);
router.get('/get/:id', paisController.findById);
router.post('/upload/sheet', upload.single('file'), paisController.sheet);
router.delete('/delete/:id', paisController.delete);
export default router;
