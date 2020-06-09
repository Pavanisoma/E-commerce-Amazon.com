const express = require('express');
const router = express.Router();
const Sale = require('../../../../mongoModels/sales');
const Purchase = require('../../../../mongoModels/customerPurchase');
const Order = require('../../../../mongoModels/orders');
const Product = require('../../../../mysqlModels/Product');
const ProductView = require('../../../../mongoModels/ProductView');

const Votes = require('../../../../mysqlModels/votes');
const sequelize = require('sequelize')


router.get('/top/seller/', async (req, res) => {
    try {
        const sellers = await Sale.find({}).sort({ sales: -1 }).limit(5);
        return res.status(200).send(sellers);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/top/customer/', async (req, res) => {
    try {
        const customers = await Purchase.find({}).sort({ purchase: -1 }).limit(5);
        return res.status(200).send(customers);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/orderPerDay/', async (req, res) => {
    let day = new Date().toISOString().slice(0, 10);
    console.log(day);
    try {
        const orders = await Order.find({ orderDate: { $gte: day } }).limit(10);
        return res.status(200).send({ length: orders.length });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/top/products/', async (req, res) => {
    let topProducts = {}
    //+ topProducts[product.productId] === undefined ? 0:topProducts[product.productId][total]
    try {
        const orders = await Order.find({})
        orders.map((order) => {
            order.products.map((product) => {
                topProducts[product.productName] = product.totalPrice + (topProducts[product.productName] === undefined ? 0 : topProducts[product.productName])
            })
        })

        var products = Object.keys(topProducts).map((key) => {
            return [key, topProducts[key]];
        });

        products.sort((first, second) => {
            return second[1] - first[1];
        });
        console.log(topProducts);
        return res.status(200).send(products.slice(0, 5));
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/seller/sales/:sellerName', async (req, res) => {
    const sellerName = req.params.sellerName;
    let day = new Date().toISOString().slice(0, 8) + "01";
    var total = 0;
    console.log(day);
    try {
        const orders = await Order.find({ orderDate: { $gte: day } })
        orders.map((order) => {
            order.products.map((product) => {
                console.log(product)
                if (product.sellerName === sellerName) {
                    console.log(total)
                    total += product.totalPrice;
                }
            })
        })
        console.log(orders);
        console.log(total);
        return res.status(200).send({ total });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/products/rating/', async (req, res) => {
    try {
        const rating = await Votes.findAll({
            attributes: ['productId', [sequelize.fn('AVG',
                sequelize.col('rating')), 'ratingAvg']],
            group: ['productId'],
            order: [[sequelize.fn('AVG', sequelize.col('rating')), 'DESC']], imit: 5
        });

        output=[]
        for(let i of rating){
            let newObj={}
            const product = await Product.findOne({
                where: {
                    id: i.dataValues.productId
                }});
                newObj={...product.dataValues}
                newObj.rating=i.dataValues.ratingAvg;
                output.push(newObj);
        }
        return res.status(200).send(output);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})


router.get('/viewcount', async (req, res) => {
    try { 
        let count = {}
        let day = new Date().toISOString().slice(0, 10);
        const views = await ProductView.find({date: day})
        views.map((view) => {
            count[view.productName] = count[view.productName] === undefined? 1: 1 + count[view.productName];
        })

        console.log(count);
        var products = Object.keys(count).map((key) => {
            return [key, count[key]];
        });

        products.sort((first, second) => {
            return second[1] - first[1];
        }); 
        console.log(products);
        return res.status(200).send(products.slice(0, 10));
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

module.exports = router;