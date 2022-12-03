import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import apiVersionOne from './routes/apiVersionOne'
import rateLimiter from './middlewares/rateLimiter'
import morganLogger from './middlewares/morganLogger'
import { errorHandler } from './middlewares/errorHandler'
import { deserializeUser } from './middlewares/deserializeUser'
import express, { NextFunction, Request, Response } from 'express'

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(express.json())
app.use(cookieParser())
app.use(deserializeUser)
app.use(express.urlencoded({ extended: true }))
app.use(morganLogger)

app.get('/', (_req: Request, res: Response) => res.send('server is running...'))

//api routes version one
app.use('/v1', apiVersionOne)

//if route doesnot exit (unknown route)
app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound())
})

app.use(errorHandler)

export default app
