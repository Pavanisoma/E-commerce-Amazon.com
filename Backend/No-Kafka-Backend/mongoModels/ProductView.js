const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductView = new Schema({
    productId: String,
    productName: String,
    date: String,
    userId: String
})

const productView = mongoose.model('productview', ProductView);

module.exports = productView;