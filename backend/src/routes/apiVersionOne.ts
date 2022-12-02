import express from 'express'
import authRoutes from './auth.routes'
import locationRoutes from './location.routes'

const apiVersionOne = express.Router()

apiVersionOne.use('/healthCheck', (_req, res) => res.send('api v1 is ok...'))

apiVersionOne.use('/auth', authRoutes)
apiVersionOne.use('/location', locationRoutes)

export default apiVersionOne
