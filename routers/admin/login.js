const router = require('express').Router()
const admin = require('../../controller/admin')

router.get('/', admin.login.view)

router.post('/', admin.login.check)

module.exports = router