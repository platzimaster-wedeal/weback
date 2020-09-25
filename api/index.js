'use strict'

const express = require('express')

const response = require('../network/response')
const errors = require('../network/errors')
const config = require('../config')

const PREFIX = '/api'
const API_VERSION = '/v1'
const BASE_PATH = `${PREFIX}${API_VERSION}`

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('', (req, res) => {
  response.success(req, res, 'Hello World!', 200)
})

app.use(BASE_PATH, router)

app.use(errors)

app.listen(config.api.port, () => {
  if (config.api.env === 'development') {
    console.log(`API Listen in http://localhost:${config.api.port}${BASE_PATH}`)
  }
})
