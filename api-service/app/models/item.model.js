const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    itemName:  { type: String ,required: true},
    quantity:  { type: String,required: true },
    price: { type: String ,required: true},
    image: { type: String ,required: true},
    status: { type: String },
    offer:{ type: String },
    deliveryCharge:{ type: String },
    createdBy:{type:String},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Item', ItemSchema);