
const express=require('express');
const router = express.Router();

const adminRouter=require('./admin/admin');
const customerRouter=require('./customer/customer');
const sellerRouter=require('./seller/seller');
const productsRouter=require('./products/products');



router.use('/admin',adminRouter);
router.use('/customer',customerRouter);
router.use('/seller',sellerRouter);
router.use('/products',productsRouter);

module.exports=router;