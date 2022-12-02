import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { UserModel } from '../../models/user.model'
import { NextFunction, Request, Response } from 'express'
import { userLoginSchema } from '../../schemas/auth_schemas/login.schema'

// @desc user login
// @route POST /auth/login
// @access public

//DTO
interface LoginDTO {
	email: string
	password: string
}
export const userLoginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate data
		const { email, password }: LoginDTO = await userLoginSchema.validateAsync(
			req.body
		)

		//find user using email
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw new createHttpError.BadRequest('User not registered')
		}

		// check if raw password matches the ecrypted password
		const isValidPassword = bcrypt.compareSync(password, user.password)
		if (!isValidPassword) {
			throw new createHttpError.Unauthorized('Invalid email/password')
		}

		res.status(200).send('user logged in successfully.')
	} catch (error: any) {
		//do not send exact error message from validation
		if (error.isJoi) {
			return next(new createHttpError.BadRequest('Invalid email/password'))
		}
		next(error)
	}
}
