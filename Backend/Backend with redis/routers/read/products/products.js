const express = require('express');
const router = express.Router();
const Product = require('./../../../mysqlModels/Product');
const Votes = require('./../../../mysqlModels/votes')

const redisRead=require('./../../../db/RedisRead')
const redisWrite=require('./../../../db/RedisWrite')


const ProductImages = require('./../../../mysqlModels/productImages')

const sequelize = require('sequelize')


router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).send(products);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id;
    try {
        redisRead.get('product_' + id, async (err, productRedis) => {
            if (productRedis != null) {
                console.log("Inside Redis!")
                return res.status(200).send(JSON.parse(productRedis));
            }
            else {
                const product = await Product.findOne({
                    where: {
                        id: req.params.id
                    }, include: [{ model: ProductImages, as: 'productImages' }]
                });
                if(product===null){
                    return res.sendStatus(404)
                }
                const rating = await Votes.findAll({
                    where: { productId: id },
                    attributes: ['productId', [sequelize.fn('AVG',
                        sequelize.col('rating')), 'ratingAvg']],
                });
              
                product.dataValues.rating = rating[0].dataValues.ratingAvg;
                res.status(200).send(product);
                return redisWrite.setex('product_' + id, 36000, JSON.stringify(product));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})


module.exports = router;