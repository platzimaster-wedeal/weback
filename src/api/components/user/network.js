'use strict'

const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/', secure('list'), list)
router.get('/:id', secure('get'), get)
router.post('/', secure('insert'), insert)
router.put('/:id', secure('update'), update)
router.delete('/:id', secure('remove'), remove)
router.get('/problems/:id_employer/getProblems', getProblems)
router.get('/postulations/:id_user/getPostulations', getPostulations)
router.get('/languages/:id_user/getLanguages', getUserLanguages)
router.get('/connections/:id_user', getConnections)

function getConnections(req, res, next) {
  controller.getConenctions(req.params)
  .then(list => {
    response.success(req, res, list, 200);
  })
  .catch(next);
}

function getPostulations(req, res,next) {
  controller.getPostulations(req.params)
  .then(list => {
    response.success(req, res, list, 200)
  })
  .catch(next)
}

function getProblems(req, res, next) {
  controller.getProblems(req.params)
  .then(list => {
    response.success(req, res, list, 200)
  })
  .catch(next)
}

function getUserLanguages(req, res, next) {
  controller.getUserLanguages(req.params)
  .then(list => {
    response.success(req, res, list, 200)
  })
  .catch(next)
}

function list (req, res, next) {
  controller.list()
    .then(list => {
      response.success(req, res, list, 200)
    })
    .catch(next)
}

function get (req, res, next) {
  controller.get(req.params.id)
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

function update (req, res, next) {
  controller.update(req.params.id, req.body, req.files)
    .then(result => {
      response.success(req, res, result, 201)
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
