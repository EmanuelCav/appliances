import { Router } from "express";

import * as imageCtrl from '../controller/image.ctrl';

import auth from '../middleware/auth/auth';
import admin from '../middleware/auth/admin';

const router = Router()

router.get('/images', [auth, admin], imageCtrl.images)
router.delete('/images/:id', [auth, admin], imageCtrl.removeImage)

export default router