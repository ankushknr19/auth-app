import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { Response } from 'express'
import createHttpError from 'http-errors'
import {
	ACCESS_TOKEN_SECRET_KEY,
	ACCESS_TOKEN_TIME_TO_LIVE,
	REFRESH_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_TIME_TO_LIVE,
} from '../../config/env'

export interface AccessTokenPayload {
	userId: Types.ObjectId
	role: string
}

//sign jwt access token async
export const signAccessToken = (res: Response, payload: AccessTokenPayload) => {
	return new Promise<string | undefined>((resolve, reject) => {
		jwt.sign(
			payload,
			ACCESS_TOKEN_SECRET_KEY,
			{
				expiresIn: ACCESS_TOKEN_TIME_TO_LIVE,
			},
			(err, accessToken) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
				res.cookie('accessToken', accessToken, {
					path: '/',
					maxAge: 30 * 24 * 60 * 60,
					httpOnly: true,
					sameSite: 'lax',
				})
				resolve(accessToken)
			}
		)
	})
}

export interface RefreshTokenPayload {
	userId: Types.ObjectId
}

//sign jwt refresh token async
export const signRefreshToken = (
	res: Response,
	payload: RefreshTokenPayload
) => {
	return new Promise<string | undefined>((resolve, reject) => {
		jwt.sign(
			payload,
			REFRESH_TOKEN_SECRET_KEY,
			{
				expiresIn: REFRESH_TOKEN_TIME_TO_LIVE,
			},
			(err, refreshToken) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
				res.cookie('refreshToken', refreshToken, {
					path: '/',
					maxAge: 30 * 24 * 60 * 60,
					httpOnly: true,
					sameSite: 'lax',
				})
				resolve(refreshToken)
			}
		)
	})
}
