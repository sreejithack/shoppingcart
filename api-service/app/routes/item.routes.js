const express = require('express');
    const item = require('../controllers/item.controller.js');
    const itemRouter = new express.Router();
    // Create a new Item
    itemRouter.post('/create', item.createItem);

    // Retrieve all item
    itemRouter.get('/all', item.findAll);

    // Retrieve a single Item with id
    itemRouter.get('/:id', item.findOne);

    // Update a Item with id
    itemRouter.put('/:id', item.updateItem);

    // Delete a Item with id
    itemRouter.delete('/:id', item.deleteItem);
    module.exports = itemRouter;
