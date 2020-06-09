const express = require('express');
const router = express.Router();
const Customer = require('./../../../../mysqlModels/Customer')
const Cart = require('./../../../../mysqlModels/Cart')
const Product = require('./../../../../mysqlModels/Product')



router.post('/:userId/:productId', async (req, res) => {
    const { quantity, flag, gift } = req.body
    const customerId = req.params.userId
    const productId = req.params.productId
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
                    flag: flag,
                    gift: gift
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

router.delete('/:userId/:productId', async (req, res) => {
    const id = req.params.userId;
    const productId=req.params.productId;

    try {
        Cart.destroy({
            where: {
                customerId: id,
                productId:productId
            }
        })
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);
})

router.put('/:userId/:productId', async (req, res) => {
    const { quantity, flag, gift } = req.body
    var updateObj = {}
    const id = req.params.userId;
    const productId=req.params.productId
    if (flag != null)
        updateObj.flag = flag;
    if (gift != null)
        updateObj.gift = gift;
    if (quantity != null)
        updateObj.quantity = quantity;
    try {
        const cart = await Cart.findOne({ where: { customerId: id, productId: productId } });
        if (cart === null) {
            return res.sendStatus(404);
        }
        else {
            const updatedCart = await Cart.update(updateObj, { where: { customerId: id, productId: productId } })
            return res.status(200).send(updatedCart);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);

})

module.exports = router;