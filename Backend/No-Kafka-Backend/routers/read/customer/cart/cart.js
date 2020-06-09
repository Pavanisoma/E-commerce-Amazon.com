
const express = require('express');
const router = express.Router();

const Cart = require('./../../../../mysqlModels/Cart')
const Product = require('./../../../../mysqlModels/Product')
const ProductImages = require('./../../../../mysqlModels/productImages')

router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findAll({ where: { customerId: req.params.userId,flag:0 } });
        let output = []
        for (let i of cart) {
            const product = await Product.findOne({
                where: {
                    id: i.productId
                }, include: [{ model: ProductImages, as: 'productImages' }]
            });
            output.push({ ...i.dataValues, ...product.dataValues })
        }
        return res.status(200).send(output);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

router.get('/saveToLater/:userId', async (req, res) => {
    try {
        const cart = await Cart.findAll({ where: { customerId: req.params.userId,flag:1 } });
        let output = []
        for (let i of cart) {
            const product = await Product.findOne({
                where: {
                    id: i.productId
                }, include: [{ model: ProductImages, as: 'productImages' }]
            });
            output.push({ ...i.dataValues, ...product.dataValues })
        }
        return res.status(200).send(output);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;