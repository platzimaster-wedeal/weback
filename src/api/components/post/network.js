'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/', secure('list'), list)
router.get('/:id', secure('get'), get)
router.post('/', secure('insert'), insert)

function list (req, res, next) {
  controller.list()
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

function insert (req, res, next) {
  controller.insert(req.body, req.files)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
