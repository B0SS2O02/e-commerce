const interface = require('../../src/interfaces.json')
const models = require('../../models')
const category = require('../../models/category')

const Titlebegin = 'Products'

exports.create_get = async (req, res) => {
    let category = await models.Category.findAll({
        attributes: [['id', 'value'], 'name']
    })
    let currencies = await models.Currencies.findAll({
        attributes: [['id', 'value'], 'name']
    })


    category = JSON.parse(JSON.stringify(category))
    currencies = JSON.parse(JSON.stringify(currencies))
    console.log(category)
    res.render('create', {
        navbar: interface.navbar,
        title: `${Titlebegin} create`,
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Name', type: 'text', placeholder: '' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: '' },
            { name: 'characteristics', label: 'Characteristics', type: 'textarea', placeholder: '' },
            { name: "image", label: 'Изображение', type: 'file', placeholder: '' },
            { name: 'cost', label: 'Cost', type: 'number', placeholder: '' },
            {
                name: 'currency',
                label: 'Currency',
                type: 'select',
                options: currencies
            },
            {
                name: 'category',
                label: 'Category',
                type: 'select',
                options: category
            }
        ]
    })
}

exports.create_post = async (req, res) => {
    console.log(req.body)
    const data = await models.Products.create({
        name: req.body.name,
        description: req.body.description,
        characteristics: req.body.characteristics,
        image: '\\' + req.file.path,
        category: req.body.category
    });
    await models.Costs.create({
        product: data.id,
        currency: req.body.currency,
        cost: req.body.cost
    });
    await models.Counts.create({
        product: data.id,
        count: 0
    });
    res.redirect('/admin/products/list')
}

exports.view = async (req, res) => {
    let data = await models.Products.findOne({
        attributes: ['name', "description", 'characteristics', "image"],
        include: [{
            model: models.Category,
            attributes: ['name']
        }, {
            model: models.Costs,
            attributes: ['cost'],
            include: [{
                model: models.Currencies,
                attributes: ['index']
            }]


        }],
        where: {
            id: req.params.id
        }
    })
    data = JSON.parse(JSON.stringify(data))
    let data1 = {}

    Object.keys(data).forEach(e => {
        if (e == 'Category') {
            data1['category'] = data[e].name
        } else if (e == 'Costs') {
            data1['cost'] = `${data[e][0].cost} ${data[e][0].Currency.index}`
        } else {
            data1[e] = data[e]
        }
    })
    data = data1
    console.log(data)


    res.render('view', {
        navbar: interface.navbar,
        title: `${Titlebegin} view`,
        footer: interface.footer,
        list: data
    })
}

exports.list = async (req, res) => {
    let data = await models.Products.findAll({
        attributes: ['id', 'name', "image", 'category'],
        include: [
            {
                model: models.Category,
                attributes: ['name']
            }
        ]
    })
    let list = [{}]
    if (JSON.parse(JSON.stringify(data)).length != 0) {
        list = JSON.parse(JSON.stringify(data))
    }
    console.log(list)
    let list1 = []
    list.forEach(e => {
        let part = {}
        Object.keys(e).forEach(element => {
            if (element == 'Category') {
                console.log(element)
                part['category'] = e[element].name
            } else {
                part[element] = e[element]
            }
        })

        list1.push(part)
    })
    list = list1
    console.log(list)
    res.render('list', {
        navbar: interface.navbar,
        title: `${Titlebegin} list`,
        footer: interface.footer,
        buttons: {
            create: {
                link: '/admin/products/create/',
                title: 'Создать'
            },
            edit: {
                link: '/admin/products/edit/',
                title: 'Редактировать'
            },
            delete: {
                title: 'Удалить',
                link: '/admin/products/delete/',
            }
        },
        routes: {
            view: '/admin/products/view/'
        },
        list: list

    })
}

exports.edit_get = async (req, res) => {
    let data = await models.Products.findOne({
        attributes: ['name', "description", 'characteristics', "image"],
        include: [{
            model: models.Costs,
            attributes: ['cost']
        }],
        where: {
            id: req.params.id
        }
    })

    let category = await models.Category.findAll({
        attributes: [['id', 'value'], 'name']
    })
    let currencies = await models.Currencies.findAll({
        attributes: [['id', 'value'], 'name']
    })
    data = JSON.parse(JSON.stringify(data))
    category = JSON.parse(JSON.stringify(category))
    currencies = JSON.parse(JSON.stringify(currencies))
    res.render('edit', {
        navbar: interface.navbar,
        title: `${Titlebegin} edit`,
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Name', type: 'text', value: data.name, placeholder: '' },
            { name: 'description', label: 'Description', value: data.description, type: 'textarea', placeholder: '' },
            { name: 'characteristics', label: 'Characteristics', value: data.characteristics, type: 'textarea', placeholder: '' },
            { name: "image", label: 'Изображение', src: data.image, type: 'file', placeholder: '' },
            { name: 'cost', value: data.Costs[0].cost, label: 'Cost', type: 'number', placeholder: '' },
            {
                name: 'currency',
                label: 'Currency',
                type: 'select',
                options: currencies
            },
            {
                name: 'category',
                label: 'Category',
                type: 'select',
                options: category
            }
        ]
    })
}

exports.edit_post = async (req, res) => {
    let New = {}
    if (req.file) {
        New['image'] = '\\' + req.file.path
    }
    console.log(req.body.category)
    New['name'] = req.body.name
    New['description'] = req.body.description
    New['characteristics'] = req.body.characteristics
    New['category'] = req.body.category
    models.Products.update(New, {
        where: {
            id: req.params.id
        }
    })
    await models.Costs.update({
        currency: req.body.currency,
        cost: req.body.cost
    }, {
        where: {
            product: req.params.id
        }
    });
    res.redirect('/admin/products/view/' + req.params.id)
}

exports.delete = async (req, res) => {
    models.Products.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/admin/products/list')
}