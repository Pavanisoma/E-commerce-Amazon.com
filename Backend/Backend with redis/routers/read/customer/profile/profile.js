const express = require('express');
const router = express.Router();


const Customer = require('./../../../../mysqlModels/Customer');

const Address = require('./../../../../mysqlModels/CustomerAddress');

const Cards = require('./../../../../mysqlModels/Card');

const redisRead = require('./../../../../db/RedisRead')
const redisWrite = require('./../../../../db/RedisWrite')

router.get('/:id', (req, res) => {

    const id = req.params.id;
    try {

        redisRead.get('profile_' + id, async (err, profile) => {
            
            if (profile != null){
                console.log("inside redis")
                return res.status(200).send(JSON.parse(profile));
            }
            else {
                const customer = await Customer.findOne({
                    where: {
                        id: id
                    }, include: [{ model: Address, as: 'customerAddresses' }, { model: Cards, as: 'cards' }]
                });
                if (customer === null) {
                    return res.status(404).send("User not found!");
                }

                redisWrite.setex('profile_' + id, 36000, JSON.stringify(customer));
                return res.status(200).send(customer);
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    }

})


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        return res.status(200).send(customers);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;