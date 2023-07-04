const router = require('express').Router()
const api = require('../../controller/api')
const util = require('../../src/util')

router.post('/confirm', util.upload.fields([]), api.order.create_post)

module.exports = router