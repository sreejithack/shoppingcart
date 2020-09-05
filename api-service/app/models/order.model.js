const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({
    item: {  type: Schema.Types.ObjectId,
        ref: 'Item',required: true},
    orderdDate:  { type: String },
    totalAmount: { type: String },
    shippingCharge: { type: String },
    paymentStatus: { type: String },
    offer:{ type: String },
    orderStatus:{ type: String },
    createdBy:{type:String},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Order', OrderSchema);