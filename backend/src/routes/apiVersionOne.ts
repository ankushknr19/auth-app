import express from 'express'
import authRoutes from './auth.routes'

const apiVersionOne = express.Router()

apiVersionOne.use('/healthCheck', (_req, res) => res.send('api v1 is ok...'))

apiVersionOne.use('/auth', authRoutes)

export default apiVersionOne
