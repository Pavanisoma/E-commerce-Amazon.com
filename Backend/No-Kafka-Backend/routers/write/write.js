
const express=require('express');
const router = express.Router();

const adminRouter=require('./admin/admin');
const customerRouter=require('./customer/customer');
const sellerRouter=require('./seller/seller');
const loginRouter=require('./login/login');
const signupRouter=require('./signup/signup');
const productsRouter=require('./products/products');
const commentRouter=require('./comments/comments');


router.use('/admin',adminRouter);
router.use('/customer',customerRouter);
router.use('/seller',sellerRouter);
router.use('/products',productsRouter);
router.use('/login',loginRouter);
router.use('/signup',signupRouter);
router.use('/comments',commentRouter);

module.exports=router;