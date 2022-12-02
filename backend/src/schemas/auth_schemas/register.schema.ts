import Joi from 'joi'

export const userRegisterSchema = Joi.object({
	name: Joi.string().lowercase().max(70).required(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).max(30).required(),
	confirmPassword: Joi.string().valid(Joi.ref('password')),
})
