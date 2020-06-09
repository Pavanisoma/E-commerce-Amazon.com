const express=require('express');
const router = express.Router();
const Order = require('../../../../mongoModels/orders');

// Update order Status by Admin
router.put('/:orderId', async (req, res) => {
    const { orderStatus, orderUpdateItem, productId } = req.body; 
    try {
        const order = await Order.findById({_id: req.params.orderId})
        if(!order) {
            return res.status(404).send('Order not found!');
        }
        order.products.map((product) => {
            if(product.productId === productId) {
                if(orderStatus) {
                    product.orderStatus = orderStatus;
                }
                if(orderUpdateItem) {
                    const list = [orderUpdateItem, ...product.orderUpdates];
                    product.orderUpdates = list
                }
            }
        })
        await order.save();
        return res.status(200).send(order);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})


module.exports = router;