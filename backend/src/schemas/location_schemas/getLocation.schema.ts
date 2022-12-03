import Joi from 'joi'

export const getLocationSchema = Joi.object({
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
})
