const router = require('express').Router()
const admin = require('../../controller/admin')

router.use(admin.verify)

router.get('/list', admin.products.list)

router.get('/create', admin.products.create)

module.exports = router