import { Router } from 'express';

import * as productCtrl from '../controller/product.ctrl';

const router = Router()

router.get('/products', productCtrl.products)
router.get('/products/:id', productCtrl.product)
router.get('/products', productCtrl.createProduct)
router.delete('/products/:id', productCtrl.removeProduct)
router.put('/products/:id', productCtrl.updateProduct)

export default router