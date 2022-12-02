import _ from 'lodash'
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { SALT_ROUND } from '../../config/env'
import { UserModel } from '../../models/user.model'
import { NextFunction, Request, Response } from 'express'
import { userRegisterSchema } from '../../schemas/auth_schemas/register.schema'

// @desc register a new user
// @route POST /api/auth/register
// @access public

//DTO
interface RegisterDTO {
	name: string
	email: string
	password: string
	confirmPassword: string
}

export const userRegisterController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get data from req.body and validate it
		const result: RegisterDTO = await userRegisterSchema.validateAsync(
			req.body
		)

		const { name, email, password } = result

		//check if email exists
		const checkDB = await UserModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new createHttpError.Conflict(
				'user with given email already exists'
			)
		}

		//encrypt the password
		const saltRounds = parseInt(SALT_ROUND)
		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(password, salt)

		//save in database
		const newUser = await UserModel.create({
			name,
			email,
			password: hashedPassword,
		})

		//send the response but omit the password
		res.status(201).json(_.omit(newUser.toJSON(), 'password'))
	} catch (error: any) {
		if (error.isJoi) error.status = 422

		next(error)
	}
}
