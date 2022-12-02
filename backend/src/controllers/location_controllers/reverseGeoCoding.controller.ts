import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import { reverseGeoCodingSchema } from '../../schemas/location_schemas/reverseGeoCoding.schema'

// @desc reverse geocoding to get location details from latitude & longitude
// @route POST /auth/login
// @access public

//DTO
interface ReverseGeoCodingDTO {
	latitude: number
	longitude: number
}
export const reverseGeoCodingController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate data
		const { latitude, longitude }: ReverseGeoCodingDTO =
			await reverseGeoCodingSchema.validateAsync(req.body)

		const url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`

		const location: any = await axios.get(url)
		const address: any = location?.data?.features[0]?.properties?.address

		/* ###### 
		TODO: acess only for logged in user and save in user's database
		###### */
		res.status(200).send({ address })
	} catch (error: any) {
		next(error)
	}
}
