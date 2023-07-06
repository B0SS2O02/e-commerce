const router = require('express').Router()
const api = require('../../controller/api')
const util = require('../../src/util')


router.get('/', api.cart.view)

router.post('/add', util.upload.fields([]), api.cart.add)

router.post('/delete', api.cart.delete)

router.post('/edit', api.cart.edit)

module.exports = router