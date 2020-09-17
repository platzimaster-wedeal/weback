'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/', secure('list'), list)
router.get('/:id', secure('get'), get)
router.post('/', secure('insert'), upsert)
router.put('/', secure('update'), upsert)
router.delete('/:id', secure('delete'), remove)

function list (req, res, next) {
  controller.list()
    .then(list => {
      response.success(req, res, list, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

function upsert (req, res, next) {
  controller.upsert(req.body)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

function remove (req, res, next) {
  controller.remove(req.params.id)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
