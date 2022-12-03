import { get } from 'lodash'
import { Response } from 'express'
import createHttpError from 'http-errors'
import { UserModel } from '../../models/user.model'
import { verifyRefreshToken } from './verify.jwt.utils'
import { signAccessToken, signRefreshToken } from './sign.jwt.utils'

//reissue tokens
export const reissueTokens = (res: Response, refreshToken: string) => {
	return new Promise<{
		newAccessToken: string | undefined
		newRefreshToken: string | undefined
	}>(async (resolve, reject) => {
		const { decoded, expired } = await verifyRefreshToken(refreshToken)

		//if refresh token verification fails
		if (!decoded || !get(decoded, 'userId') || expired) {
			return reject(new createHttpError.Unauthorized())
		}

		//find user
		const user = await UserModel.findById(get(decoded, 'userId'))

		if (!user) {
			return reject(new createHttpError.Unauthorized())
		}

		//sign new tokens
		const newAccessToken = await signAccessToken(res, {
			userId: user._id,
			role: user.role,
		})
		const newRefreshToken = await signRefreshToken(res, { userId: user._id })

		resolve({ newAccessToken, newRefreshToken }),
			(err: any) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
			}
	})
}
