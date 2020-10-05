'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/:id_post', secure('list'), list)
router.post('/:id_post/users/:id_user', secure('insert'), insert)
router.delete('/:id_post/users/:id_user', secure('remove'), remove)

function list (req, res, next) {
  controller.list(req.params)
    .then(list => {
      response.success(req, res, list, 200)
    })
    .catch(next)
}

function insert (req, res, next) {
  controller.insert(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

function remove (req, res, next) {
  controller.remove(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
