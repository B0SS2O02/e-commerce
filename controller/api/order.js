const models = require('../../models')
const util = require('../../src/util')

exports.create_post = (req, res) => {
    console.log(req.body)
    res.json(req.body)
}