import express from 'express'
import { reverseGeoCodingController } from '../controllers/location_controllers/reverseGeoCoding.controller'

const router = express.Router()

router.route('/reverse-geo-coding').post(reverseGeoCodingController)

export default router
