'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/:id', secure('get'), getComment)
router.get('/posts/:id_post', secure('get'), getCommentsPost)
router.post('/', secure('insert'), insert)
router.delete('/:id', secure('remove'), remove)

function getComment (req, res, next) {
  controller.getComment(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

function getCommentsPost (req, res, next) {
  controller.getCommentsPost(req.params)
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

function remove (req, res, next) {
  controller.remove(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
