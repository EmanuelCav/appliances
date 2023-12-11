import { Router } from 'express';

import * as productCtrl from '../controller/product.ctrl';

import { upload } from '../helper/images/multer';

const router = Router()

router.get('/products', productCtrl.products)
router.get('/products/:id', productCtrl.product)
router.post('/products', upload.array("files", 10), productCtrl.createProduct)
router.delete('/products/:id', productCtrl.removeProduct)
router.put('/products/:id', productCtrl.updateProduct)

export default router