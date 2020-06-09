const express = require('express');
const router = express.Router();
const Seller = require('../../../mysqlModels/Seller');
const Product = require('../../../mysqlModels/Product');

const redisWrite = require('./../../../db/RedisWrite');

router.post('/:id', async (req, res) => {
    const sellerId = req.params.id;
    try {
        const seller = await Seller.findOne({
            where: {
                id: sellerId
            }
        })
        if (seller === null) {
            return res.status(404).send('User not found!');
        }
        const product = await Product.create({
            productName: req.body.productName,
            sellerName: req.body.sellerName,
            price: req.body.price,
            rating: req.body.rating,
            inventory: req.body.inventory,
            description: req.body.description,
            sellerId: req.body.sellerId,
            categoryId: req.body.categoryId
        })
        return res.status(201).send(product);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error!');
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {

        const product = await Product.findOne({
            where: {
                id: id
            }
        });
        if (product === null) {
            return res.status(404).send("Product not found!");
        }
        else {
            const updatedProduct = await Product.update({
                productName: req.body.productName,
                sellerName: req.body.sellerName,
                price: req.body.price,
                rating: req.body.rating,
                inventory: req.body.inventory,
                description: req.body.description,
                sellerId: req.body.sellerId,
                categoryId: req.body.categoryId
            }, { where: { id: id } })
            res.status(200).send(updatedProduct);

            redisWrite.setex('product_' + id, 36000, JSON.stringify(await Product.findOne({
                where: {
                    id: id
                }
            })));
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const result = Product.destroy({
            where: {
                id: id
            }
        })
     res.sendStatus(200);
        return redisWrite.del('product_'+id);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})



module.exports = router;