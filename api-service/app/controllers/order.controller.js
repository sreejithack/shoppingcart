const Order = require('../models/order.model.js');

// Create and Save a new Order
exports.createOrder = (req, res) => {
    // Create a Order
    const order = new Order({
        item: req.body.item,
        orderdDate:  req.body.orderdDate,
        totalAmount: req.body.totalAmount,
        shippingCharge: req.body.shippingCharge,
        paymentStatus: req.body.paymentStatus,
        offer:req.body.offer,
    });

    // Save Order in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    });
};

// Retrieve and return all Orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .populate({ path: 'item', select: 'itemName' })
    .then(Orders => {
        res.send(Orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Orders."
        });
    });
};

// Find a single Order with a OrderId
exports.findOne = (req, res) => {
    Order.findById(req.params.id)
    .populate({ path: 'item', select: 'itemName' })
    .then(Order => {
        if(!Order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });            
        }
        res.send(Order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Order with id " + req.params.id
        });
    });
};

// Update a Order identified by the OrderId in the request
exports.updateOrder = (req, res) => {
    // Find Order and update it with the request body
    Order.findByIdAndUpdate(req.params.id, {
        item: req.body.item,
        orderdDate:  req.body.orderdDate,
        totalAmount: req.body.totalAmount,
        shippingCharge: req.body.shippingCharge,
        paymentStatus: req.body.paymentStatus,
        offer:req.body.offer,
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.id
        });
    });
};

// Delete a Order with the specified OrderId in the request
exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.OrderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.OrderId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.OrderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params.OrderId
        });
    });
};


exports.cancelOrder = (req, res) => {
    // Find Order and update it with the request body
    Order.findByIdAndUpdate(req.params.id, {
       orderStatus: req.body.orderStatus, 
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.id
        });
    });
};