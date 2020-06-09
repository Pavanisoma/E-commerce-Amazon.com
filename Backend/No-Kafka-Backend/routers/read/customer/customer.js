const express=require('express');
const router = express.Router();

const order=require('./order/order')
const profile = require('./profile/profile')
const cart=require('./cart/cart')

const comments=require('./comments/comments')
const votes=require('./votes/votes')

router.use('/profile',profile);
router.use('/orders',order);
router.use('/cart',cart);
router.use('/comments',comments);
router.use('/votes',votes);


const Votes = require('./../../../mysqlModels/votes')

const Product=require('./../../../mysqlModels/Product')

const Customer=require('./../../../mysqlModels/Customer')

const Comments=require('./../../../mysqlModels/Comments')

router.get('/product/comments/:productId', async (req, res) => {

    try {
        const customer = await Customer.findOne({
            where: {
                id: req.params.productId
            }});
        if (customer === null) {
            return res.status(404).send("User not found!");
        }
        const comments = await Comments.findAll({ where: { productId: req.params.productId}});
        return res.status(200).send(comments);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

router.get('/product/votes/:productId',async (req,res)=>{
    try {
        const customer = await Product.findOne({
            where: {
                id: req.params.productId
            }});
        if (customer === null) {
            return res.status(404).send("User not found!");
        }
        const votes = await Votes.findAll({ where: { productId: req.params.productId}});
        return res.status(200).send(votes);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");

})






module.exports=router;