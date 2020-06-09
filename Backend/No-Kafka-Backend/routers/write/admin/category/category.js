const express=require('express');
const router = express.Router();
const Category = require('../../../../mysqlModels/Category');


router.post('/', async (req, res) => {
    try {
        const category = await Category.create({categoryName: req.body.categoryName});
        return res.status(201).send(category);   
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.put('/:id',async (req, res)=>{

    const {categoryName}=req.body
    const id=req.params.id;
    try {
        const category = await Category.findOne({
            where: {
                id:id
            }
        });
        if ( Category=== null) {
            return res.status(404).send("Category not found!");
        }
        else {
            const newCategory=await Category.update({
               categoryName:categoryName
            },{where:{id:id}})

        return res.status(200).send(newCategory);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
    
})

router.delete('/:id', async (req, res) => {
    const id=req.params.id;
    try {
        const result= Category.destroy({
            where:{
                id:id
            }
        })
        return res.sendStatus(200);
        }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})




module.exports=router;