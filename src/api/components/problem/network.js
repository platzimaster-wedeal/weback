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