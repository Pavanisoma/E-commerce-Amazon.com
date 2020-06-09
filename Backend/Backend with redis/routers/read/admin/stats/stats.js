const express=require('express');
const router = express.Router();
const Sale = require('../../../../mongoModels/sales');
const Purchase = require('../../../../mongoModels/customerPurchase');


router.get('/top/seller/', async (req, res) => {
    try {
        const sellers = await Sale.find({}).sort({sales: -1}).limit(5);
        return res.status(200).send(sellers);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/top/customer/', async (req, res) => {
    try {
        const customers = await Purchase.find({}).sort({purchase: -1}).limit(5);
        return res.status(200).send(customers);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})


module.exports=router;