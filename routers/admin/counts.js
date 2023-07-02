const router = require('express').Router()
const admin = require('../../controller/admin')
const util = require('../../src/util')

router.use(admin.verify)

router.get('/list', admin.counts.list)

router.get('/edit/:id', admin.counts.edit_get)

router.post('/edit/:id', util.upload.single('image'), admin.counts.edit_post)


module.exports = router