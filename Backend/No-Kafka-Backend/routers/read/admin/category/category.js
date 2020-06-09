const express = require('express');
const router = express.Router();
const Category = require('../../../../mysqlModels/Category');
const Product = require('../../../../mysqlModels/Product');
const Seller = require('../../../../mysqlModels/Seller')



router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).send(categories);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Servre Error!')
    }
})


router.get('/noProductsMapped', async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Product
                }
            ]
        });

        output = []
        for (let i of categories) {
            if (i.dataValues.products.length === 0) {
                output.push(i.dataValues)
            }
        }

        return res.status(200).send(output);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Servre Error!')
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOne({
            where: {
                id: id
            }, include: [
                {
                    model: Product
                }
            ]
        })
        if (category === null) {
            return res.status(404).send('Category not found!');
        }
        

        output = []

         let newObj = { ...category.dataValues }
         let products = []
         for (let j of newObj.products) {
             let newObj2 = { ...j.dataValues }
             const seller = await Seller.findOne({
                        where: {
                            id: j.sellerId
                        }
                    });
             newObj2.seller = seller

             products.push(newObj2);
            
        }
        newObj.products = products;
         output.push(newObj);

        res.status(200).send(output);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Servre Error!')
    }

})



module.exports = router;