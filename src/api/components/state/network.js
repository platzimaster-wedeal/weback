'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/:id_country/states', secure('list'), list)
router.get('/:id_country/states/:id', secure('get'), get)

function list (req, res, next) {
  controller.list(req.params)
    .then(list => {
      response.success(req, res, list, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  controller.get(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
