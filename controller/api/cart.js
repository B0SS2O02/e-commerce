const models = require('../../models')
const util = require('../../src/util')

exports.edit = async (req, res) => {
    res.send()
}

exports.view = async (req, res) => {
    res.send()
}

exports.delete = async (req, res) => {
    res.send()
}

exports.add = async (req, res) => {
    let info = {
        ip: req.ip,
        device: req.headers['user-agent'],
        cart: req.body.cart
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
        let not=0
        cart.forEach(element => {
            if (element[0]==product) {

            }
        })
    });
    res.json([user, products])
}