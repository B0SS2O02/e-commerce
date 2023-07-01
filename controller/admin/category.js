const interface = require('../../src/interfaces.json')
const models = require('../../models')
const category = require('../../models/category')

exports.create_get = (req, res) => {
    res.render('create', {
        navbar: interface.navbar,
        title: 'Category create',
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Name', type: 'text', placeholder: '' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: '' },
            { name: "image", label: 'Изображение', type: 'file', placeholder: '' },
        ]
    })
}

exports.create_post = (req, res) => {
    models.Category.create({
        name: req.body.name,
        description: req.body.description,
        image: '\\' + req.file.path
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
    console.log(JSON.parse(JSON.stringify(category)))
    res.render('view', {
        navbar: interface.navbar,
        title: 'Category view',
        footer: interface.footer,
        list: JSON.parse(JSON.stringify(category))
    })
}

exports.list = async (req, res) => {
    let catgeories = await models.Category.findAll({
        attributes: ['id', 'name', "image"]
    })
    let list = [{}]
    if (JSON.parse(JSON.stringify(catgeories)).length != 0) {
        list = JSON.parse(JSON.stringify(catgeories))
    }
    console.log(JSON.parse(JSON.stringify(catgeories)).length == 0)
    res.render('list', {
        navbar: interface.navbar,
        title: 'Category list',
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
    console.log(req.params.id)
    let category = await models.Category.findOne({
        attributes: ['name', "description", "image"],
        where: {
            id: req.params.id
        }
    })
    category = JSON.parse(JSON.stringify(category))
    res.render('edit', {
        navbar: interface.navbar,
        title: 'Category edit',
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
        New['image'] = '\\' + req.file.path
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