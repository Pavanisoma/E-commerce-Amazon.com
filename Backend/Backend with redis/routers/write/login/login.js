const express = require('express');
const router = express.Router();
const User = require('./../../../mysqlModels/User')
const Customer = require('./../../../mysqlModels/Customer');
const Seller = require('./../../../mysqlModels/Seller');
const Admin = require('./../../../mysqlModels/Admin');

const Address = require('./../../../mysqlModels/CustomerAddress');
const Cards = require('./../../../mysqlModels/Card');




router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(user)
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else if (user.password === req.body.password) {
            if (user.userType === 'customer') {
                const customer = await Customer.findOne({
                    where: {
                        userId: user.id
                    }, include: [{ model: Address, as: 'customerAddresses' }, { model: Cards, as: 'cards' }]
                })
                res.status(200).send(customer);
            }
            else if (user.userType === 'seller') {
                const seller = await Seller.findOne({
                    where: {
                        userId: user.id
                    }
                })
                res.status(200).send(seller);
            }
            else {
                const admin = await Admin.findOne({
                    where: {
                        userId: user.id
                    }
                })
                res.status(200).send(admin);
            }
            return
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {

        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;