import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import routes from '../routes'
import compression from 'compression'
import path from 'path'

// Ejecutar Express
const app = express()

// Logger
app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode < 400 || process.env === 'test',
    stream: process.stderr
  })
)

app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode >= 400 || process.env === 'test',
    stream: process.stdout
  })
)

// Middleware
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))
app.use('/api/v1', routes)

export default app
