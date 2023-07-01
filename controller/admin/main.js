const interface = require('../../src/interfaces.json')


exports.main=(req, res) => {
    res.render('main', {
        navbar: interface.navbar,
        title: 'Main',
        footer: interface.footer
    })
}