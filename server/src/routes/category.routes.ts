import { Router } from "express";

import * as categoryCtrl from '../controller/category.ctrl';

import auth from '../middleware/auth/auth';
import admin from '../middleware/auth/admin';

const router = Router()

router.get('/categories', categoryCtrl.categories)
router.post('/categories', [auth, admin], categoryCtrl.createCategory)
router.delete('/categories/:id', [auth, admin], categoryCtrl.removeCategory)

export default router