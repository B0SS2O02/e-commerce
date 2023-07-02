const router = require('express').Router()
const admin = require('../../controller/admin')

router.use(admin.redirect)

module.exports = router