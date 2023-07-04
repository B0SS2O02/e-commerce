const models = require('../../models')
const util = require('../../src/util')

exports.list = async (req, res) => {
    const count = parseInt(req.query.count) || 10
    const page = parseInt(req.query.page) || 1
    let data = await models.Products.findAll({
        attributes: ['id', "name", 'image'],
        offset: (page - 1) * count,
        limit: count
    })
    res.json(data)
}

exports.view = async (req, res) => {
    let data = await models.Products.findOne({
        attributes: ['id', 'name', 'image', 'characteristics', 'description'],
        include: [
            {
                model: models.Category,
                attributes: ['id', 'name', 'image']
            }
        ]
    })
    res.json(data)
}