const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    sellerName: String,
    sales: {
        type: Number,
        default: 0
    }

})

const Sale = mongoose.model('sale', SaleSchema);

module.exports = Sale;