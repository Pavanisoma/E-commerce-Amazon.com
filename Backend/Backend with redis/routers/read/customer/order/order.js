const express=require('express');
const router = express.Router();
const Order = require('../../../../mongoModels/orders');


// router.get('/:orderId', async (req, res) => {
//     try {
//         const order = await Order.findOne({_id: req.params.orderId})
//         if(!order) {
//             return res.status(404).send('Order not found!');
//         }
//         return res.status(200).send(order);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error!')
//     }
// })

router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({customerId: req.params.userId})
        return res.status(200).send(orders);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Servr Error!')
    }
})



module.exports=router;