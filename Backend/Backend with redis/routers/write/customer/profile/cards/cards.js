const express = require('express');
const router = express.Router();
const Customer = require('./../../../../../mysqlModels/Customer')
const Card = require('./../../../../../mysqlModels/Card')
const Address = require('./../../../../../mysqlModels/CustomerAddress')
const redisWrite = require('./../../../../../db/RedisWrite')

router.post('/:userId', async (req, res) => {
    const { name, cardNumber, expirationDate, cvv } = req.body
    const id = req.params.userId;
    try {
        const user = await Customer.findOne({
            where: {
                id: req.params.userId
            }
        });
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else {
            const newCard = await Card.create({
                customerId: id,
                cardNumber: cardNumber,
                expirationDate: expirationDate,
                cvv: cvv,
                name: name,
            })
            return res.status(200).send(newCard);
        }

    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");

})

router.put('/:id/:cardId', async (req, res) => {
    const { name, cardNumber, expirationDate, cvv } = req.body
    const id = req.params.cardId;
    try {
        const card = await Card.findOne({
            where: {
                id: id
            }
        });
        if (card === null) {
            return res.status(404).send("Card not found!");
        }
        else {
            const card = await Card.update({
                customerId: id,
                cardNumber: cardNumber,
                expirationDate: expirationDate,
                cvv: cvv,
                name: name,
            }, { where: { id: id } })

            res.status(200).send(card);
            return redisWrite.setex('profile'+id,36000,JSON.stringify(await Customer.findOne({
                where: {
                    id: id
                }, include: [{ model: Address, as: 'customerAddresses' }, { model: Cards, as: 'cards' }]
            })))
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");

})



router.delete('/:id/:cardId', async (req, res) => {
    id = req.params.cardId;
    try {
        await Card.destroy({
            where: {
                id: id
            }
        })
        res.sendStatus(200);
        return redisWrite.del('profile_' + req.params.id)
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})


module.exports = router;