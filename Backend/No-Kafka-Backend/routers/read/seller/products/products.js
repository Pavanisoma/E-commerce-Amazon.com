const express=require('express');
const router = express.Router();
const Product = require('./../../../../mysqlModels/Product');


router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    try {
        const products = await Product.findAll({
            where: {
                sellerId: id,
            },
        });
        if (products === null) {
            return res.sendStatus(404);
        }
        return res.status(200).send(products);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

module.exports=router;