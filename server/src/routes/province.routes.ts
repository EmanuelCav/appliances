import { Router } from "express";

import * as provinceCtrl from '../controller/province.ctrl';

const router = Router()

router.get('/provinces', provinceCtrl.provinces)
router.post('/provinces', provinceCtrl.createProvince)
router.delete('/provinces/:id', provinceCtrl.removeProvince)

export default router