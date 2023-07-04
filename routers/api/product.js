const router = require('express').Router()
const api = require('../../controller/api')


router.get('/', api.products.list)

router.get('/:id', api.products.view)

module.exports = router