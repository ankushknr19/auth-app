import express from 'express'
import { timezoneController } from '../controllers/location_controllers/timezone.controller'
import { reverseGeoCodingController } from '../controllers/location_controllers/reverseGeoCoding.controller'

const router = express.Router()

router.route('/reverse-geo-coding').post(reverseGeoCodingController)
router.route('/timezone').post(timezoneController)

export default router
