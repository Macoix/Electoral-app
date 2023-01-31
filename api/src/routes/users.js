import { Router } from 'express'
import users from '../controllers/users'
import VerifyJWT from '../middlewares/VerifyJWT'

const router = Router()

router.get('/', users.get)
router.get('/get/:id', users.getById)
router.put('/put/:id', users.update)
router.delete('/delete/:id', users.delete)
router.get('/pagination', users.getPagination)
router.post('/', users.create)
router.get('/token', VerifyJWT, users.getUserToken)
export default router
