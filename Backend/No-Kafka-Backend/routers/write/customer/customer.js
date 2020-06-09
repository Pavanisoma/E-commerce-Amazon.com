const express=require('express');
const router = express.Router();

const order=require('./order/order')
const profile = require('./profile/profile')
const cart=require('./cart/cart')



router.use('/profile',profile);
router.use('/orders',order);
router.use('/cart',cart);



module.exports=router;