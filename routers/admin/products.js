const router = require('express').Router()
const admin = require('../../controller/admin')
const util = require('../../src/util')

router.use(admin.verify)

router.get('/list', admin.products.list)

router.get('/view/:id', admin.products.view)

router.get('/create', admin.products.create_get)

router.post('/create', util.upload.single('image'), admin.products.create_post)

router.get('/edit/:id', admin.products.edit_get)

router.post('/edit/:id', util.upload.single('image'), admin.products.edit_post)

router.get('/delete/:id', admin.products.delete)

module.exports = router