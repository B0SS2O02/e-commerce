const interface = require('../../src/interfaces.json')
const models = require('../../models')
const util = require('../../src/util')

const Titlebegin = 'Category'

exports.create_get = (req, res) => {
    res.render('create', {
        navbar: interface.navbar,
        title: `${Titlebegin} create`,
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Name', type: 'text', placeholder: '' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: '' },
            { name: "image", label: 'Изображение', type: 'file', placeholder: '' },
        ]
    })
}

exports.create_post = (req, res) => {
    let data = {
        name: req.body.name,
        description: req.body.description,
    }
    if (!!req.file) {
        data['image'] = '/' + req.file.destination + req.file.filename
    }
    models.Category.create({
        name: data.name,
        description: data.description,
        image: data.image
    });
    res.redirect('/admin/category/list')
}

exports.view = async (req, res) => {
    let category = await models.Category.findOne({
        attributes: ['name', "description", "image"],
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
    let catgeories = await models.Category.findAll({
        attributes: ['id', 'name', "image"]
    })
    let list = [{}]
    if (util.toJSON(catgeories).length != 0) {
        list = util.toJSON(catgeories)
    }
    res.render('list', {
        navbar: interface.navbar,
        title: `${Titlebegin} list`,
        footer: interface.footer,
        buttons: {
            create: {
                link: '/admin/category/create/',
                title: 'Создать'
            },
            edit: {
                link: '/admin/category/edit/',
                title: 'Редактировать'
            },
            delete: {
                title: 'Удалить',
                link: '/admin/category/delete/',
            }
        },
        routes: {
            view: '/admin/category/view/'
        },
        list: list

    })
}

exports.edit_get = async (req, res) => {
    let category = await models.Category.findOne({
        attributes: ['name', "description", "image"],
        where: {
            id: req.params.id
        }
    })
    category = util.toJSON(category)
    res.render('edit', {
        navbar: interface.navbar,
        title: `${Titlebegin} edit`,
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Name', type: 'text', value: category.name, placeholder: '' },
            { name: 'description', label: 'Description', value: category.description, type: 'textarea', placeholder: '' },
            { name: "image", label: 'Изображение', src: category.image, type: 'file', placeholder: '' },
        ]
    })
}

exports.edit_post = async (req, res) => {
    let New = {}
    if (req.file) {
        New['image'] = '/' + req.file.destination + req.file.filename
    }
    New['name'] = req.body.name
    New['description'] = req.body.description
    models.Category.update(New, {
        where: {
            id: req.params.id
        }
    })
    res.redirect('/admin/category/view/' + req.params.id)
}

exports.delete = async (req, res) => {
    models.Category.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/admin/category/list')
}