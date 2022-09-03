import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import 'express-async-errors'

import errorHandler from './errors/handler'
import routes from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use((request, response, next) => {
  next(response.status(404).json({ erro: 'Página não encontrada' }))
})

app.use(errorHandler)

export default app
