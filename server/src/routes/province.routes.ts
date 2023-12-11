import { Router } from "express";

import * as provinceCtrl from '../controller/province.ctrl';

import auth from '../middleware/auth/auth';
import admin from '../middleware/auth/admin';

const router = Router()

router.get('/provinces', [auth, admin], provinceCtrl.provinces)
router.post('/provinces', [auth, admin], provinceCtrl.createProvince)
router.delete('/provinces/:id', [auth, admin], provinceCtrl.removeProvince)

export default router