const express=require('express');
const router = express.Router();
const Category = require('../../../../mysqlModels/Category');



router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).send(categories);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Servre Error!')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOne({
            where: {
                id: id
            }
        })
        if(category === null) {
            return res.status(404).send('Category not found!');
        }
        res.status(200).send(category);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Servre Error!')
    }
    
})



module.exports=router;