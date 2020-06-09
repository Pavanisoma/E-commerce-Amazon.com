const express=require('express');
const router = express.Router();
const Order = require('../../../../mongoModels/orders');

// Get all orders by Admin
router.get('/', async (req, res) => {
    const sellerName = req.query.sellerName;
    const deliveryStatus = req.query.deliveryStatus;
    try {
        if(sellerName && deliveryStatus) {
            const orders = await Order.find().elemMatch("products", {sellerName: sellerName}, "products.orderUpdate", {deliveryStatus: deliveryStatus}).sort({orderDate: -1});
            console.log(orders);
            return res.status(200).send(orders);
        }
        if(sellerName) {
            const orders = await Order.find().elemMatch("products", {sellerName: sellerName}).sort({orderDate: -1});
            console.log(orders);
            return res.status(200).send(orders);
        } else if(deliveryStatus) {
            const orders = await Order.find().elemMatch("products.orderUpdates", {deliveryStatus: deliveryStatus}).sort({orderDate: -1});
            console.log(orders);
            return res.status(200).send(orders);
        } else {
            const orders = await Order.find({});
            return res.status(200).send(orders);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!')
    }
})




module.exports = router;