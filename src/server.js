const express = require('express')
const app = express()
var bodyParser = require('body-parser')
let cookieParser = require("cookie-parser");

require('dotenv').config()

const admin = require('../routers/admin')

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))

for (const route in admin) {
    app.use('/admin/' + route, admin[route])
}



app.listen(process.env.PORT, () => {
    console.log(`Server started on port : ${process.env.PORT}`)
})