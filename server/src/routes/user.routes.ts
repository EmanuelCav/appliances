import { Router } from 'express';

import * as userCtrl from '../controller/user.ctrl';

import registerValid from '../middleware/validation/register.valid';
import loginValid from '../middleware/validation/login.valid';
import updateUserValid from '../middleware/validation/user.update';

const router = Router()

router.get('/users', userCtrl.users)
router.post('/users/register', registerValid, userCtrl.register)
router.post('/users/login', loginValid, userCtrl.login)
router.delete('/users/:id', userCtrl.removeUser)
router.put('/users/:id', updateUserValid, userCtrl.updateUser)

export default router