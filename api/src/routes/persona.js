import personaController from '../controllers/persona';
import { Router } from 'express';
import upload from '../middlewares/upload';
const router = Router();

router.get('/', personaController.get);
router.get('/pagination', personaController.pagination);
router.post('/', personaController.create);
router.put('/put/:id', personaController.update);
router.get('/get/:id', personaController.findById);
router.post('/upload/sheet', upload.single('file'), personaController.sheet);
router.delete('/delete/:id', personaController.delete);
router.get('/find/:document', personaController.findByDocument);
router.get('/findemail/:email', personaController.findByEmail);
router.get('/search', personaController.searchByCriterios);
export default router;
