import jwt from 'jsonwebtoken'
import {
	ACCESS_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_SECRET_KEY,
} from '../../config/env'

//verify jwt access token
export const verifyAccessToken = async (token: string) => {
	try {
		//decode token
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY)
		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (error: any) {
		return {
			valid: false,
			expired: true,
			decoded: null,
		}
	}
}

//verify jwt refresh token
export const verifyRefreshToken = async (token: string) => {
	try {
		//decode token
		const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY)
		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (error: any) {
		return {
			valid: false,
			expired: true,
			decoded: null,
		}
	}
}
