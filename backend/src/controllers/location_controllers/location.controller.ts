import _ from 'lodash'
import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../../models/user.model'
import { getLocationSchema } from '../../schemas/location_schemas/getLocation.schema'

// @desc get location and timezone details from latitude & longitude
// @route POST /location
// @access private

//DTO
interface GetLocationDTO {
	latitude: number
	longitude: number
}
export const getLocationController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate data
		const { latitude, longitude }: GetLocationDTO =
			await getLocationSchema.validateAsync(req.body)

		//reverse geo-coding api to get adresss info from latitude & longitude
		const reverseGeoCodingUrl = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`

		const location: any = await axios.get(reverseGeoCodingUrl)
		const address: any = location?.data?.features[0]?.properties?.address

		//timezone api to get timezone from latitude & longitude
		const timezoneUrl = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`

		const response: any = await axios.get(timezoneUrl)
		const { timezone_id: timezone } = response.data

		//update user's location data in database
		const dbUser = await UserModel.findById(res.locals.user?.userId).select(
			'-password'
		)

		const updatedUser = await UserModel.findOneAndUpdate(
			{ _id: dbUser?._id },
			{
				location: {
					address,
					timezone,
				},
			},
			{
				new: true,
			}
		)

		//send updated user data but omit the password
		res.status(200).json(_.omit(updatedUser?.toJSON(), 'password'))
	} catch (error: any) {
		next(error)
	}
}
