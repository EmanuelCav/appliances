import { Router } from 'express';

import * as userCtrl from '../controller/user.ctrl';

import registerValid from '../middleware/validation/register.valid';
import loginValid from '../middleware/validation/login.valid';
import updateUserValid from '../middleware/validation/user.update';

import auth from '../middleware/auth/auth';
import admin from '../middleware/auth/admin';

const router = Router()

router.get('/users', [auth, admin], userCtrl.users)
router.get('/users/:id', auth, userCtrl.user)
router.post('/users/register', registerValid, userCtrl.register)
router.post('/users/login', loginValid, userCtrl.login)
router.delete('/users/:id', [auth, admin], userCtrl.removeUser)
router.put('/users/:id', updateUserValid, userCtrl.updateUser)

export default router