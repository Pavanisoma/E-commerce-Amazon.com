
const express = require('express');
const router = express.Router();

const Cart = require('./../../../../mysqlModels/Cart')
const Product = require('./../../../../mysqlModels/Product')
const ProductImages = require('./../../../../mysqlModels/productImages')

router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { customerId: req.params.userId } });

        const product = await Product.findOne({
            where: {
                id: cart.productId
            }
        });

        console.log(product)
        var output = { ...cart.dataValues, ...product.dataValues }
        return res.status(200).send(output);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;