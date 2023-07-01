const router = require('express').Router()
const admin=require('../../controller/admin')

router.use(admin.verify)

router.get('/',admin.main.main)

module.exports = router