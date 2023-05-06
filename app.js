const config = require('./utils/config')
const express = require('express')
const asyncErrors = require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const app = express()
app.use(asyncErrors())

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app