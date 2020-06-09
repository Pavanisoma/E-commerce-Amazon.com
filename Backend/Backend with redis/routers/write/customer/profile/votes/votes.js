const express = require('express');
const router = express.Router();
const Customer = require('./../../../../../mysqlModels/Customer')
const Votes = require('./../../../../../mysqlModels/votes')
const Product = require('./../../../../../mysqlModels/Product')



router.post('/:userId/:productId', async (req, res) => {
    const { rating } = req.body
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
        const user = await Customer.findOne({
            where: {
                id: userId
            }
        });
        if (user === null) {
            return res.sendStatus(404);
        }
        else {
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            if (product === null) {
                return res.sendStatus(404);
            }
            else {
                const newVote = await Votes.create({
                    rating: rating,
                    customerId: userId,
                    productId: productId
                })
                return res.status(200).send(newVote);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Votes.destroy({
            where: {
                id: id
            }
        })
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);
})

router.put('/:id', async (req, res) => {
    const { rating } = req.body
    const id = req.params.id;
    try {
        const votes = await Votes.findOne({
            where: {
                id: id
            }
        });
        if (votes === null) {
            return res.sendStatus(404);
        }
        else {
            const updatedVote = await Votes.update({
                rating: rating,
            }, { where: { id: id } })
            return res.status(200).send(updatedVote);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);

})

module.exports = router;