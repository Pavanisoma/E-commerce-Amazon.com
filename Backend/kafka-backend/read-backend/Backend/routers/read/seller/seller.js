const express=require('express');
const router = express.Router();

const products=require('./products/products');
const profile=require('./profile/profile');

router.use('/product',products);
router.use('/profile', profile);

module.exports=router;