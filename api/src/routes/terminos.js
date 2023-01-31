import { Router } from 'express';
import terminosController from '../controllers/terminosCondiciones';
const router = Router();

router.get('/', terminosController.get);
router.put('/', terminosController.update);

export default router;
