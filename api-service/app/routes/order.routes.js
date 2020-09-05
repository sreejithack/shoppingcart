const express = require('express');
    const order = require('../controllers/order.controller.js');
    const orderRouter = new express.Router();
    // Create a new Item
    orderRouter.post('/create', order.createOrder);

    // Retrieve all item
    orderRouter.get('/all', order.findAll);

    // Retrieve a single Item with id
    orderRouter.get('/:id', order.findOne);

    orderRouter.put('/cancel/:id', order.cancelOrder);
    // Update a Item with id
    orderRouter.put('/:id', order.updateOrder);

    // Delete a Item with id
    orderRouter.delete('/:id', order.deleteOrder);
    module.exports = orderRouter;
