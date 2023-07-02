const router = require('express').Router()
const admin = require('../../controller/admin')
const util = require('../../src/util')

router.use(admin.verify)

router.get('/list', admin.currencies.list)

router.get('/view/:id', admin.currencies.view)

router.get('/create', admin.currencies.create_get)

router.post('/create', util.upload.single('image'), admin.currencies.create_post)

router.get('/edit/:id', admin.currencies.edit_get)

router.post('/edit/:id', util.upload.single('image'), admin.currencies.edit_post)

router.get('/delete/:id', admin.currencies.delete)

module.exports = router