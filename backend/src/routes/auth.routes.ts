import express from 'express'
import { requireUser } from '../middlewares/requireUser'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'

const router = express.Router()

router.route('/login').post(userLoginController)

router.route('/register').post(userRegisterController)

router.delete('/logout', requireUser, userLogoutController)

export default router
