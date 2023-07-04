const interface = require('../../src/interfaces.json')
const models = require('../../models')

const Titlebegin = 'Currencies'
const Link = '/admin/currencies/'

const util = require('../../src/util')

exports.create_get = (req, res) => {
    res.render('create', {
        navbar: interface.navbar,
        title: `${Titlebegin} create`,
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Name', type: 'text', placeholder: 'Dollar' },
            { name: 'index', label: 'Index', type: 'text', placeholder: 'USD' },
            { name: "rate", label: 'Rate', type: 'text', placeholder: '34.5' },
        ]
    })
}

exports.create_post = (req, res) => {
    models.Currencies.create({
        name: req.body.name,
        index: req.body.index,
        rate: req.body.rate,
    });
    res.redirect(Link + 'list')
}

exports.view = async (req, res) => {
    let category = await models.Currencies  .findOne({
        attributes: ['name', "index", 'rate'],
        where: {
            id: req.params.id
        }
    })
    res.render('view', {
        navbar: interface.navbar,
        title: `${Titlebegin} view`,
        footer: interface.footer,
        list: util.toJSON(category)
    })
}

exports.list = async (req, res) => {
    let data = await models.Currencies.findAll({
        attributes: ['id', 'name', "index", 'rate']
    })
    let list = [{}]
    if (util.toJSON(data).length != 0) {
        list = util.toJSON(data)
    }
    res.render('list', {
        navbar: interface.navbar,
        title: `${Titlebegin} list`,
        footer: interface.footer,
        buttons: {
            create: {
                link: '/admin/currencies/create',
                title: 'Создать'
            },
            edit: {
                link: '/admin/currencies/edit/',
                title: 'Редактировать'
            },
            delete: {
                title: 'Удалить',
                link: '/admin/currencies/delete/',
            }
        },
        routes: {
            view: '/admin/currencies/view/'
        },
        list: list

    })
}

exports.edit_get = async (req, res) => {
    let data = await models.Currencies.findOne({
        attributes: ['name', "index", 'rate'],
        where: {
            id: req.params.id
        }
    })
    data = util.toJSON(data)
    res.render('edit', {
        navbar: interface.navbar,
        title: `${Titlebegin} edit`,
        footer: interface.footer,
        form: [
            { name: 'name', value: data.name, label: 'Name', type: 'text', placeholder: 'Dollar' },
            { name: 'index', value: data.index, label: 'Index', type: 'text', placeholder: 'USD' },
            { name: "rate", value: data.rate, label: 'Rate', type: 'text', placeholder: '34.5' },
        ]
    })
}

exports.edit_post = async (req, res) => {
    let New = {}
    if (req.file) {
        New['image'] = '\\' + req.file.path
    }
    New['name'] = req.body.name
    New['index'] = req.body.index
    New['rate'] = req.body.rate
    models.Currencies.update(New, {
        where: {
            id: req.params.id
        }
    })
    res.redirect(Link + 'view/' + req.params.id)
}

exports.delete = async (req, res) => {
    models.Currencies.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect(Link + 'list')
}