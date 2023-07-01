require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (!!req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.secretKey);
            req.token = decoded
        } catch (error) {
            res.clearCookie("token");
            res.redirect('/admin/login')
        }
    } else {
        res.redirect('/admin/login')
    }
    next()
}