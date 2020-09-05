const Item = require('../models/item.model.js');
const path = require('path');
const multer = require('multer');
const dir = './app/assets/images/';
const config = require('../../config.json');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
var uploadImage = multer({ storage: storage }).single('itemimage');
exports.createItem = (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            return res.send(err);
        }
        if (req.file && req.file !== undefined) {
            Img = req.file.filename;

        }
        const item = new Item({
            itemName: req.query.itemName,
            quantity: req.query.quantity,
            price: req.query.price,
            image: Img,
            deliveryCharge: req.query.deliveryCharge,
            status: req.query.status,
            offer: req.query.offer
        });
        item.save()
        .then(data => {
       
            res.send(data);
        }).catch(err => {
           
            res.send(err);
        });
    });
};
// Retrieve and return all Item from the database.
exports.findAll = (req, res) => {
    Item.find()
        .then(items => {
            res.send(items);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });
};

// Find a single Item with a id
exports.findOne = (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Item with id " + req.params.id
            });
        });
};

// Update a Item identified by the id in the request
exports.updateItem = (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            return res.send("error");
        }
        if (req.file && req.file !== undefined) {
            Img = req.file.filename;

        }
       
// Find Item and update it with the request body
    Item.findByIdAndUpdate(req.params.id, {
        itemName: req.query.itemName,
        quantity: req.query.quantity,
        price: req.query.price,
        image: Img,
        deliveryCharge: req.query.deliveryCharge,
        status: req.query.status,
        offer: req.query.offer
    }, { new: true })
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "item not found with id " + req.params.id
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Item with id " + req.params.id
            });
        });
    });
};

// Delete a Item with the specified id in the request
exports.deleteItem = (req, res) => {
    Item.findByIdAndRemove(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            res.send({ message: "Item deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Item with id " + req.params.id
            });
        });
};

