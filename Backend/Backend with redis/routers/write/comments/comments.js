const express = require('express');
const router = express.Router();
const Customer = require('./../../../mysqlModels/Customer')
const Comments = require('./../../../mysqlModels/Comments')
const Product = require('./../../../mysqlModels/Product')


router.post('/:userId/:productId', async (req, res) => {
    const { comment } = req.body
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
        const user = await Customer.findOne({
            where: {
                id: userId
            }
        });
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else {
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            if (product === null) {
                return res.status(404).send("product not found!");
            }
            else {
                const newComment = await Comments.create({
                    comment: comment,
                    customerId: userId,
                    productId: productId
                })
                return res.status(200).send(newComment);
            }
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
        const result= Comments.destroy({
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

router.put('/:id', async (req, res) => {
    const { comment } = req.body
    const id = req.params.id;
    try {
        const comments = await Comments.findOne({
            where: {
                id: id
            }
        });
        if (comments === null) {
            return res.status(404).send("Comment not found!");
        }
        else {
            const updatedComment = await Comments.update({
                comment: comment,
            }, { where: { id: id } })

            return res.status(200).send(updatedComment);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);

})

module.exports = router;