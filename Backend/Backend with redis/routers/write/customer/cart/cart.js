const express = require('express');
const router = express.Router();
const Customer = require('./../../../../mysqlModels/Customer')
const Cart = require('./../../../../mysqlModels/Cart')
const Product = require('./../../../../mysqlModels/Product')



router.post('/:userId/:productId', async (req, res) => {
    const { quantity,flag } = req.body
    const customerId=req.params.userId
    const productId=req.params.productId
    try {
        const user = await Customer.findOne({
            where: {
                id: customerId
            }
        });
        if (user === null) {
            return res.sendStatus(404);
        }
        else {
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            if (product === null) {
                return res.sendStatus(404);
            }
            else {
                const newCart = await Cart.create({
                    quantity: quantity,
                    customerId: customerId,
                    productId: productId,
                    flag:flag
                })
                return res.status(200).send(newCart);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Cart.destroy({
            where: {
                customerId: id
            }
        })
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);
})

router.put('/:id', async (req, res) => {
    const { quantity,flag } = req.body
    const id = req.params.id;
    try {
        const cart = await Cart.findOne({
            where: {
                customerId: id
            }
        });
        if (cart === null) {
            return res.sendStatus(404);
        }
        else {
            const updatedCart = await Cart.update({
                quantity: quantity,
                flag:flag
            }, { where: { customerId: id } })
            return res.status(200).send(updatedCart);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);

})

module.exports = router;