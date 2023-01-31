import documentoController from '../controllers/documento';
import { Router } from 'express';

const router = Router();

router.get('/', documentoController.get);
router.get('/pagination', documentoController.pagination);
router.post('/', documentoController.create);
router.put('/put/:id', documentoController.update);
router.get('/get/:id', documentoController.getById);

export default router;
