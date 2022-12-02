import app from '../../../app'
import request from 'supertest'
import { UserModel } from '../../../models/user.model'
import { connectDB, disconnectDB } from '../../../config/database'

const latLong = {
	latitude: 27.707939,
	longitude: 83.45697,
}

describe('user location', () => {
	beforeAll(async () => {
		await connectDB()
	})

	beforeEach(async () => {
		await UserModel.deleteMany()
	})

	afterAll(async () => {
		disconnectDB()
	})

	describe('POST /v1/location/reverse-geo-coding', () => {
		it('should return address details from latitude & longitude', async () => {
			const res = await request(app)
				.post('/v1/location/reverse-geo-coding')
				.send(latLong)

			expect(res.statusCode).toBe(200)
		})
	})

	describe('POST /v1/location/timezone', () => {
		it('should return timezone id and country code from latitude & longitude', async () => {
			const res = await request(app)
				.post('/v1/location/timezone')
				.send(latLong)

			expect(res.statusCode).toBe(200)
		})
	})
})
