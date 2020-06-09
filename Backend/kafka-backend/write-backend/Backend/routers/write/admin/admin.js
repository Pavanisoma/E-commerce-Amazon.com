const express=require('express');
const router = express.Router();

const category=require('./category/category')
const order=require('./order/order')


router.use('/category',category)
router.use('/orders', order)



module.exports=router;