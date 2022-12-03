import fs from 'fs'
import app from './app'
import https from 'https'
import { PORT } from './config/env'
import logger from './middlewares/winstonLogger'
import { connectDB, disconnectDB } from './config/database'

//httpOnly cookie requires https
connectDB().then(() => {
	https
		.createServer(
			{
				key: fs.readFileSync('key.pem'),
				cert: fs.readFileSync('cert.pem'),
			},
			app
		)
		.listen(PORT, () =>
			logger.info(`server is running on port https://localhost:${PORT}....`)
		)
})

async function gracefullShutdown() {
	await disconnectDB()
	logger.warn('shutting down server...')
	process.exit(1)
}

process.on('unhandledRejection', (reason: Error) => {
	logger.error(reason.message)
	logger.warn('unhandled rejection!')
	throw reason
})

process.on('uncaughtException', (error: Error) => {
	logger.error(error.message)
	gracefullShutdown
})

process.on('SIGINT', gracefullShutdown)
process.on('SIGTERM', gracefullShutdown)
