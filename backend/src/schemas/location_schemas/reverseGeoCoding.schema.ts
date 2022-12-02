import Joi from 'joi'

export const reverseGeoCodingSchema = Joi.object({
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
})
