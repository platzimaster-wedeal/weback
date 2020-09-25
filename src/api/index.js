'use strict'

const express = require('express')

const user = require('./components/user/network')
const login = require('./components/auth/network')
const country = require('./components/country/network')

const errors = require('../network/errors')
const config = require('../config')

const BASE_PATH = '/api'
const API_VERSION = '/v1'
const API_URL = `${BASE_PATH}${API_VERSION}`

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`${API_URL}/users`, user)
app.use(`${API_URL}/auth`, login)
app.use(`${API_URL}/countries`, country)

app.use(errors)

app.listen(config.api.port, () => {
  if (config.api.env === 'development') {
    console.log(`API Listen in http://localhost:${config.api.port}${API_URL}`)
  }
})
