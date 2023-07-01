const interface = require('../../src/interfaces.json')

exports.create = (req, res) => {
    res.render('create', {
        navbar: interface.navbar,
        title: 'Product create',
        footer: interface.footer,
        form: [
            { name: 'name', label: 'Имя', type: 'text', placeholder: 'Введите имя' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'Введите email' },
            { name: 'message', label: 'Сообщение', type: 'textarea', placeholder: 'Введите сообщение' },
            { name: 'message', label: 'Сообщение', type: 'textarea', placeholder: 'Введите сообщение' },
            { name: "image", label: 'Изображение', type: 'file', placeholder: 'Выберите изение' },
            {
                name: 'fieldName',
                label: 'Field Label',
                type: 'select',
                options: [{
                    name:'option 1',
                    value:'1'
                },{
                    name:'option 2',
                    value:'2'
                }, {
                    name:'option 3',
                    value:'3'
                }]
            }]
    })
}

exports.list = (req, res) => {
    res.render('list', {
        navbar: interface.navbar,
        title: 'Product list',
        footer: interface.footer,
        buttons: {
            create: {
                link: '/admin/products/create',
                title: 'Создать'
            },
            edit: {
                link: '/admin/products/edit',
                title: 'Редактировать'
            },
            delete: {
                title: 'Удалить'
            }
        }
    })
}