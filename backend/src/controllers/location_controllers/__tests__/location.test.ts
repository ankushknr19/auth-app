import app from '../../../app'
import request from 'supertest'
import { UserModel } from '../../../models/user.model'
import { connectDB, disconnectDB } from '../../../config/database'

const testUser = {
	email: 'test@gmail.com',
	password: 'test123',
}

const testRegisterUser = { ...testUser, name: 'Test User' }

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

	describe('POST /v1/location', () => {
		it('should return address & timezone details from latitude & longitude', async () => {
			await request(app).post('/v1/auth/register').send(testRegisterUser)

			await request(app).post('/v1/auth/login').send(testUser)

			const res = await request(app).post('/v1/location').send(latLong)

			expect(res.statusCode).toBe(200)
			expect(res.body).not.toBeNull()
		})
	})
})
