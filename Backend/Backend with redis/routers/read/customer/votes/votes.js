
const express = require('express');
const router = express.Router();

const Votes = require('./../../../../mysqlModels/votes')

const Customer=require('./../../../../mysqlModels/Customer')



router.get('/:userId', async (req, res) => {

    try {
        const customer = await Customer.findOne({
            where: {
                id: req.params.userId
            }});
        if (customer === null) {
            return res.status(404).send("User not found!");
        }
        const votes = await Votes.findAll({ where: { customerId: req.params.userId}});
        return res.status(200).send(votes);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

router.get('/:productId', async (req, res) => {
    
    try {
        const customer = await Customer.findOne({
            where: {
                id: req.params.userId
            }});
        if (customer === null) {
            return res.status(404).send("User not found!");
        }
        const votes = await Votes.findAll({ where: { productId: req.params.productId}});
        return res.status(200).send(votes);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;