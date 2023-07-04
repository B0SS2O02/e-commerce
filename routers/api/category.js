const router = require('express').Router()
const api = require('../../controller/api')


router.get('/', api.category.list)

router.get('/:id', api.category.view)

module.exports = router