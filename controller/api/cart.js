const models = require('../../models')
const util = require('../../src/util')

exports.edit = async (req, res) => {
    res.send()
}

exports.view = async (req, res) => {
    let info = {
        ip: req.ip,
        device: req.headers['user-agent']
    }
    let data = await models.cartUser.findOne({
        attributes: ['id'],
        include: [
            {
                model: models.cart,
                attributes: ['count'],
                include: [{
                    model: models.Products,
                    attributes: ['id', 'name']
                }]
            }
        ],
        where: {
            ip: info.ip,
            device: info.device
        }
    })
    data = util.toJSON(data)
    res.json(data)
}

exports.delete = async (req, res) => {
    let info = {
        ip: req.ip,
        device: req.headers['user-agent'],
        cart: req.body.cart || []
    }
    let user = await models.cartUser.findOne({
        where: {
            ip: info.ip,
            device: info.device
        }
    })
    user = util.toJSON(user)
    info.cart.forEach(element => {
        models.cart.destroy({
            where: {
                user: user.id,
                product: element.product
            }
        })
    })
    res.send()
}

exports.add = async (req, res) => {
    let info = {
        ip: req.ip,
        device: req.headers['user-agent'],
        cart: req.body.cart || []
    }
    let user = await models.cartUser.findOne({
        attributes: ['id', 'ip', 'device'],
        where: {
            ip: info.ip
        }
    })
    if (user) {
        user = util.toJSON(user)
        if (user.device != info.device) {
            await models.cartUser.update({
                device: info.device
            }, {
                where: {
                    id: user.id
                }
            })
            user.device = info.device
        }
    } else {
        user = await models.cartUser.create(info)
        user = util.toJSON(user)
    }
    let products = await models.cart.findAll({
        attributes: ['product', 'count'],
        where: {
            user: user.id
        }
    })
    products = util.toJSON(products)
    products.forEach(product => {
        info.cart.forEach((element, index) => {
            if (product.product == element.product) {
                if (product.count != element.count) {
                    models.cart.update({
                        count: element.count
                    }, {
                        where: {
                            user: user.id,
                            product: element.product
                        }
                    })
                }
                info.cart.splice(index, 1)
            }
        })
    });
    info.cart.forEach(element => {
        models.cart.create({
            user: user.id,
            count: element.count,
            product: element.product
        })
    })
    res.send()
}