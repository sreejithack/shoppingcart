const bodyParser = require('body-parser');
const itemRouter = require('./item.routes');
const orderRouter = require('./order.routes');


const express = require('express');
const path = require('path');
module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        res.json({ "message": "Welcome to Shopping Cart" });
    });
    app.use(express.static(path.join(__dirname, '../assets/files/')));
       app.use('/api/item', itemRouter);
       app.use('/api/order', orderRouter);


}