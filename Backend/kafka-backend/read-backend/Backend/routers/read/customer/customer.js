const express=require('express');
const router = express.Router();
const kafka=require('./../../../kafka/client')

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



module.exports=router;