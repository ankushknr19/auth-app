import express from 'express'
import { getLocationController } from '../controllers/location_controllers/location.controller'
import { requireUser } from '../middlewares/requireUser'

const router = express.Router()

router.route('/').post(requireUser, getLocationController)

export default router
