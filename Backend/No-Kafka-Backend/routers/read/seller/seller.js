const express=require('express');
const router = express.Router();

const products=require('./products/products');
const profile=require('./profile/profile');
const order=require('./order/order');

router.use('/product',products);
router.use('/profile', profile);
router.use('/orders', order);

module.exports=router;