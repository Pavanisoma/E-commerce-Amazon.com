const express = require('express');
const router = express.Router();
const Product = require('./../../../mysqlModels/Product');
const Votes = require('./../../../mysqlModels/votes')
const ProductView = require('./../../../mongoModels/ProductView');


const ProductImages=require('./../../../mysqlModels/productImages')

const sequelize = require('sequelize')


router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({include: [{ model:ProductImages,as:'productImages'} ]});
        return res.status(200).send(products);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})


router.get('/:userId/:id', async (req, res) => {
    const userId = req.params.userId;
    const id = req.params.id;
    try {
        const rating = await Votes.findAll({
            where: { productId: id },
            attributes: ['productId', [sequelize.fn('AVG',
                sequelize.col('rating')), 'ratingAvg']],
        });
        
        const product = await Product.findOne({
            where:{
                id:req.params.id
            },include: [{ model:ProductImages,as:'productImages'}]});
            console.log(product);
        product.dataValues.rating=rating[0].dataValues.ratingAvg;
        console.log(product);
        const name = product.productName;
        let day = new Date().toISOString().slice(0, 10);
        const productView = await ProductView.findOne({userId: userId, productId: id, date: day});
        if(productView === null) {
            const viewCount = new ProductView({userId: userId, productId: id, date: day, productName: name});
            await viewCount.save();
        }
        return res.status(200).send(product);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})


module.exports = router;