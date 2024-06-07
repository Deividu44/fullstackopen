const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const app = express()
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MONGODB'))
  .catch(error => logger.error({ error: error.message }))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', notesRouter)


app.use(middleware.unknownEndpoint)

module.exports = app