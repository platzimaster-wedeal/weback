'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/users/:id_employee', secure('get'), get)
router.post('/', secure('insert'), insert)

function get (req, res, next) {
  controller.get(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

function insert (req, res, next) {
  controller.insert(req.body)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
