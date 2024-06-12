const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MONGODB'))
  .catch(error => logger.error({ error: error.message }))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
