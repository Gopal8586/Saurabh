// cartModel.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    grandTotal: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
