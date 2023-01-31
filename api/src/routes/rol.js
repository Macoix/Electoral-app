import { Router } from 'express';
import rolController from '../controllers/rol';
const router = Router();

router.get('/', rolController.get);
router.get('/pagination', rolController.pagination);
router.post('/', rolController.create);
router.put('/put/:id', rolController.update);
router.get('/get/:id', rolController.findById);

export default router;
