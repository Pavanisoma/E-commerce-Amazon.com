const express=require('express');
const router = express.Router();
const Order = require('../../../../mongoModels/orders');

router.get('/:sellerName', async (req, res) => {
    console.log(req.params.sellerName);
    const sellerName = req.params.sellerName;
    try {
        const orders = await Order.find().elemMatch("products", {sellerName: sellerName}).sort({orderDate: -1});
        console.log(orders);
        return res.status(200).send(orders);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
})

router.get('/stats/products/:sellerName', async (req, res) => {
    const sellerName = req.params.sellerName;
    let day = new Date().toISOString().slice(0, 8) + "01";
    var total = 0;
    console.log(day);
    try {
        const orders = await Order.find({orderDate: {$gte: day}})
        orders.map((order) => {
            order.products.map((product) => {
                if(product.sellerName === sellerName) {
                    total += product.totalPrice;
                }
            })
        })
        console.log(total);
        return res.status(200).send({total});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
})


module.exports=router;