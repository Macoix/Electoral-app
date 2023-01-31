import { Router } from 'express';
import votacionController from '../controllers/votacion';
const router = Router();

router.get('/', votacionController.get);
router.get('/pagination', votacionController.pagination);
router.post('/', votacionController.create);
router.put('/put/:id', votacionController.update);
router.get('/get/:id', votacionController.findById);
router.delete('/delete/:id', votacionController.delete);
router.get('/puestos', votacionController.puestos);
router.get('/mesas', votacionController.mesas);
export default router;
