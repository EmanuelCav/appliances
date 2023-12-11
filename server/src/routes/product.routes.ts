import { Router } from 'express';

import * as productCtrl from '../controller/product.ctrl';

import { upload } from '../helper/images/multer';

import auth from '../middleware/auth/auth';
import admin from '../middleware/auth/admin';

import createValid from '../middleware/validation/product/create.valid';
import updateValid from '../middleware/validation/product/update.valid';

const router = Router()

router.get('/products', productCtrl.products)
router.get('/products/:id', productCtrl.product)
router.post('/products', upload.array("files", 10), [auth, admin], createValid, productCtrl.createProduct)
router.delete('/products/:id', [auth, admin], productCtrl.removeProduct)
router.put('/products/:id', [auth, admin], updateValid, productCtrl.updateProduct)

export default router