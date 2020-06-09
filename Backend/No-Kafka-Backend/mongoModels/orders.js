const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId: String,
    customerName: {
        type: String
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    billing: {
        name: String,
        cardNumber: String,
        totalPrice: Number,
        
    }, 
    shippingAddress: {
        AddressId: String,
        name: String,
        address1: String,
        adress2: String,
        city: String,
        state: String,
        country: String,
        zipcode: String,
        phoneNumber: String   
    },
    products: [{
        productId: String,
        productName: String,
        productPhotoUrl: String,
        sellerName: String,
        quantity: Number,
        perQuantityPrice: Number,
        totalPrice: Number,
        orderStatus: String,
        gift: {
            gift: Boolean,
            giftMessage: String
        },
        orderUpdates: [{
            date: {
                type: Date,
                default: Date.now
            },
            deliveryStatus: String
        }]

    }]

})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;