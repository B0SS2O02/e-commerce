const interface = require('../../src/interfaces.json')
const models = require('../../models')

const Titlebegin = 'Counts'
const Link = '/admin/counts/'

exports.list = async (req, res) => {
    let data = await models.Counts.findAll({
        attributes: ['id', 'count'],
        include: [
            {
                model: models.Products,
                attributes: ['name', "image"]
            }
        ]
    })
    let list = [{}]
    if (JSON.parse(JSON.stringify(data)).length != 0) {
        list = JSON.parse(JSON.stringify(data))
    }
    let list1 = []
    list.forEach(e => {
        let part = {}
        Object.keys(e).forEach(element => {
            if (element == 'Product') {
                Object.keys(e[element]).forEach(a => {
                    part[a] = e[element][a]
                })
            } else {
                part[element] = e[element]
            }
        })
        list1.push(part)
    })
    console.log(list1)
    list = list1
    res.render('list', {
        navbar: interface.navbar,
        title: `${Titlebegin} list`,
        footer: interface.footer,
        buttons: {
            edit: {
                link: Link + 'edit/',
                title: 'Редактировать'
            }
        },
        routes: {
            view: 'none'
        },
        list: list

    })
}

exports.edit_get = async (req, res) => {
    let data = await models.Counts.findOne({
        attributes: ['count'],
        include: [{
            model: models.Products,
            attributes: ['name']
        }],
        where: {
            id: req.params.id
        }
    })
    data = JSON.parse(JSON.stringify(data))
    res.render('edit', {
        navbar: interface.navbar,
        title: `${Titlebegin} edit`,
        footer: interface.footer,
        form: [
            { name: 'Name', value: data.Product.name, label: 'Name', type: 'none', placeholder: '' },
            { name: 'count', value: data.count, label: 'Count', type: 'number', placeholder: '' },
        ]
    })
}


exports.edit_post = async (req, res) => {
    let New = {}
    New['count'] = req.body.count
    models.Counts.update(New, {
        where: {
            id: req.params.id
        }
    })
    res.redirect(Link + 'list/')
}