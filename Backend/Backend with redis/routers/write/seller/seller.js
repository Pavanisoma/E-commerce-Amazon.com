const express=require('express');
const router = express.Router();


const profile=require('./profile/profile');
const order=require('./order/order');

router.use('/profile',profile);
router.use('/orders',order);

module.exports=router;