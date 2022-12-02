import app from '../../../app'
import request from 'supertest'
import { UserModel } from '../../../models/user.model'
import { connectDB, disconnectDB } from '../../../config/database'

const testUser = {
	email: 'test@gmail.com',
	password: 'test123',
}

const testRegisterUser = { ...testUser, name: 'Test User' }

describe('user auth', () => {
	beforeAll(async () => {
		await connectDB()
	})

	beforeEach(async () => {
		await UserModel.deleteMany()
	})

	afterAll(async () => {
		disconnectDB()
	})

	describe('POST /v1/auth/register', () => {
		it('should return register a user', async () => {
			const res = await request(app)
				.post('/v1/auth/register')
				.send(testRegisterUser)

			expect(res.statusCode).toBe(201)
		})
	})
	describe('POST /v1/auth/login', () => {
		it('should return login a user', async () => {
			await request(app).post('/v1/auth/register').send(testRegisterUser)

			const res = await request(app).post('/v1/auth/login').send(testUser)

			expect(res.statusCode).toBe(200)
		})
	})
})
