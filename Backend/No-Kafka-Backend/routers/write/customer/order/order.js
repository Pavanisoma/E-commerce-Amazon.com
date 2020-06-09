const express=require('express');
const router = express.Router();
const Order = require('../../../../mongoModels/orders');
const Sale = require('../../../../mongoModels/sales');
const Purchase = require('../../../../mongoModels/customerPurchase');


router.post('/:userId',async (req, res) => {
    const customerId = req.params.userId;
    try {
        const order = new Order({customerId, ...req.body})
        await order.save();

        var customer = await Purchase.findOne({customerId: customerId});
        if(customer !== null) {
            customer.purchase += order.billing.totalPrice;
            await customer.save();
        } else {
            var customer = new Purchase({customerId: customerId, customerName: req.body.customerName, purchase: order.billing.totalPrice })
            await customer.save()
        }
        
        order.products.map(async (product) => {
            var seller = await Sale.findOne({sellerName: product.sellerName})
            console.log("seller", seller);
            if(seller !== null) {
                seller.sales += product.totalPrice;
                await seller.save();
            } else {
                var sale = new Sale({sellerName: product.sellerName, sales: product.totalPrice});
                await sale.save();
            }
        })
        
        res.status(201).send(order);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.put('/:orderId', async (req, res) => {
    const {  totalPrice, orderStatus, orderUpdateItem, productId } = req.body; 
    try {
        const order = await Order.findById({_id: req.params.orderId})
        if(!order) {
            return res.status(404).send('Order not found!');
        }
        const {customerName, customerId} = order;
        order.products.map(async (product) => {
            if(product.productId === productId) {
                if(orderStatus) {
                    product.orderStatus = orderStatus;
                }
                if(orderUpdateItem) {
                    const list = [orderUpdateItem, ...product.orderUpdates];
                    product.orderUpdates = list
                }
                if(totalPrice){
                    const seller = Sale.find({sellerName: sellerName})
                    if(seller !== null) {
                        seller.sales -= product.totalPrice;
                        await seller.save();
                    }
                    
                    const customer = Purchase.find({customerId: customerId})
                    if(customer !== null) {
                        customer.purchase -= product.totalPrice;
                        await customer.save();
                    }
                    product.totalPrice = 0;

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

/*
router.delete('/:userId/:orderId/:productId', async (req, res) => {
    const {userId, orderId, productId} = req.params;
    try {
        const order = await Order.findOne({_id: orderId});
        if(order.customerId !== userId) {
            return res.status(400).send("No Authorization");
        }
        order.products.map((product) => {
            if(product.productId !== productId) {
                return product
            }
        })
        await order.save();
        return res.status(200).send("Order Cancelled with Success!")
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    }
})
*/

// router.put('/:orderId', async (req, res) => {
//     try {
//         const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
//         if(!order) {
//             return res.status(404).send('Order not found!');
//         }
//         return res.status(200).send(order);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error!');
//     }
// })


module.exports=router;