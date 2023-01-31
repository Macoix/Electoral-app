import { Router } from 'express';
import ConfigController from '../controllers/configuracion';
import ImageUpload from '../middlewares/ImageUpload';
const router = Router();

router.get('/', ConfigController.get);
router.post('/image', ImageUpload.single('avatar'), ConfigController.changeImg);
router.post('/slogan', ImageUpload.single('avatar'), ConfigController.changeSlogan);
router.post('/texto', ImageUpload.single('avatar'), ConfigController.changeTexto);
// router.put('/', ConfigController.update);

export default router;
