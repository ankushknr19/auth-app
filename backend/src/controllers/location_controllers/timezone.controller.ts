import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import { timezoneSchema } from '../../schemas/location_schemas/timezone.schema'

// @desc get user's timezone id and country from latitude & longitude
// @route POST /location/timezone
// @access public

//DTO
interface TimezoneDTO {
	latitude: number
	longitude: number
}
export const timezoneController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate data
		const { latitude, longitude }: TimezoneDTO =
			await timezoneSchema.validateAsync(req.body)

		const url = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`

		const response: any = await axios.get(url)
		const { timezone_id, country_code } = response.data

		/* ###### 
		TODO: acess only for logged in user and save in user's database
		###### */
		res.status(200).send({ timezone_id, country_code })
	} catch (error: any) {
		next(error)
	}
}
