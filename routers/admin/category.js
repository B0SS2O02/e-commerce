const router = require('express').Router()
const admin = require('../../controller/admin')
const util = require('../../src/util')

router.use(admin.verify)

router.get('/list', admin.category.list)

router.get('/view/:id', admin.category.view)

router.get('/create', admin.category.create_get)

router.post('/create', util.upload.single('image'), admin.category.create_post)

router.get('/edit/:id', admin.category.edit_get)

router.post('/edit/:id', util.upload.single('image'), admin.category.edit_post)

router.get('/delete/:id', admin.category.delete)

module.exports = router