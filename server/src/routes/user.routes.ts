import { Router } from 'express';

import * as userCtrl from '../controller/user.ctrl';

const router = Router()

router.get('/users', userCtrl.users)

export default router