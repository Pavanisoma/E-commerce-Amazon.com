
const express = require('express');
const router = express.Router();

const Comments = require('./../../../../mysqlModels/Comments')

const Customer=require('./../../../../mysqlModels/Customer')

const Product=require('./../../../../mysqlModels/Product')

router.get('/:userId', async (req, res) => {

    try {
        const customer = await Customer.findOne({
            where: {
                id: req.params.userId
            }});
        if (customer === null) {
            return res.status(404).send("User not found!");
        }
        const comments = await Comments.findAll({ where: { customerId: req.params.userId}});
        output=[]
        for(let i of comments){
            let newObj={...i.dataValues}
            const product = await Product.findOne({
                where: {
                    id: newObj.productId
                }});
                newObj.product=product
                output.push(newObj);
        }
        return res.status(200).send(output);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

router.get('/product/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            }});
        if (product === null) {
            return res.status(404).send("Product not found!");
        }
        const comments = await Comments.findAll({ where: { productId: req.params.productId}});
        
        output=[]
        for(let i of comments){
            let newObj={...i.dataValues}
            const customer = await Customer.findOne({
                where: {
                    id: newObj.customerId
                }});
                newObj.customer=customer
                output.push(newObj);
        }
        return res.status(200).send(output);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;