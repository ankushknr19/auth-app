import mongoose from 'mongoose'
import logger from '../middlewares/winstonLogger'
import { MONGO_URI, NODE_ENV } from '../config/env'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoMemoryServer: MongoMemoryServer

export async function connectDB() {
	try {
		let mongoURI: string = MONGO_URI

		if (NODE_ENV == 'test') {
			mongoMemoryServer = await MongoMemoryServer.create()
			mongoURI = mongoMemoryServer.getUri()
		}

		await mongoose.connect(mongoURI)
	} catch (error: any) {
		logger.error(
			'error during inital connection to mongodb database: ',
			error
		)
		process.exit(1)
	}
}

mongoose.connection.on('connected', () =>
	mongoMemoryServer
		? logger.info('using mongo memory server for test environment...')
		: logger.info('Mongodb database connected...')
)

mongoose.connection.on('error', (err) => logger.error(err.message))

mongoose.connection.on('disconnected', connectDB)

export async function disconnectDB() {
	try {
		logger.warn('Mongodb database disconnected...')
		await mongoose.connection.close()
		mongoMemoryServer && mongoMemoryServer.stop()
	} catch (error) {
		logger.warn('Error during disconnecting mongodb database')
	}
}
