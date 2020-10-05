'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/:id_user_to/followers', secure('get'), getUserFollowers)
router.post('/:id_user_from/follow/:id_user_to', secure('insert'), follow)
router.delete('/:id_user_from/follows/:id_user_to', secure('remove'), unFollow)


function getUserFollowers (req, res, next) {
  controller.getUserFollowers(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

function follow (req, res, next) {
  controller.follow(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}
function unFollow (req, res, next) {
  controller.unFollow(req.params)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(next)
}

module.exports = router
