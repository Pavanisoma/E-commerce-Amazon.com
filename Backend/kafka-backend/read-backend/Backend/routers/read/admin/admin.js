const express=require('express');
const router = express.Router();

const category=require('./category/category')
const stats=require('./stats/stats')
const order=require('./order/order')

router.use('/stats',stats);
router.use('/category',category)
router.use('/orders',order)



module.exports=router;