'use strict'

const express = require('express')
const config = require('../config')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const cors = require('cors')

// Utils
const errors = require('../network/errors')

// Components
const user = require('./components/user/network')
const login = require('./components/auth/network')
const country = require('./components/country/network')
const state = require('./components/state/network')
const city = require('./components/city/network')
const post = require('./components/post/network')
const problem = require('./components/problem/network')

// Server settings
const BASE_PATH = '/api'
const API_VERSION = '/v1'
const API_URL = `${BASE_PATH}${API_VERSION}`
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({origin: 'http://localhost:3000'}))
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
app.use(multer({ storage }).fields([
  {
    name: 'myFile', maxCount: 10
  },
  {
    name: 'myAvatar', maxCount: 1
  }
]))

// Routes
app.use(`${API_URL}/users`, user)
app.use(`${API_URL}/auth`, login)
app.use(`${API_URL}/countries`, country)
app.use(`${API_URL}/countries`, state)
app.use(`${API_URL}/countries`, city)
app.use(`${API_URL}/posts`, post)
app.use(`${API_URL}/problems`, problem)
app.use(errors)

// Server initialization
app.listen(config.api.port, () => {
  if (config.api.env === 'development') {
    console.log(`API Listen in http://localhost:${config.api.port}${API_URL}`)
  }
})
