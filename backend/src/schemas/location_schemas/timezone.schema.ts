import Joi from 'joi'

export const timezoneSchema = Joi.object({
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
})
