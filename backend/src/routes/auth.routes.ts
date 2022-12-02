import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'

const router = express.Router()

router.route('/login').post(userLoginController)

router.route('/register').post(userRegisterController)

export default router
