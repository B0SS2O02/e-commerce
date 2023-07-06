const express = require('express')
const app = express()
var bodyParser = require('body-parser')
let cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config()

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');


const admin = require('../routers/admin')
const api = require('../routers/api/')

app.use(cors());
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

for (const route in api) {
    app.use('/api/' + route, api[route])
}

app.use('/test', (req, res) => {
    res.json(req.headers)
})

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port : ${process.env.PORT}`)
})