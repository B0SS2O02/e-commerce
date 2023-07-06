require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.view = (req, res) => {
    res.render('login')
}

exports.check = (req, res) => {
    if (req.body.nick == process.env.nick) {
        if (req.body.password == process.env.password) {
            const token = jwt.sign(
                {
                    nick: process.env.nick,
                    type: 1
                },
                process.env.secretKey,
                {
                    expiresIn: '1h'
                });
            res.clearCookie("token");
            res.cookie('token', token)
            res.redirect('/admin/main')
        } else {
            res.redirect('/admin/login?error=pass')
        }
    } else {
        res.redirect('/admin/login?error=nick')
    }

}