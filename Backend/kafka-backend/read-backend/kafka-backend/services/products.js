const Votes = require('../mysqlModels/votes');
const Product = require('../mysqlModels/Product');
const sequelize = require('sequelize')

const ProductImages=require('./../mysqlModels/productImages')

getAllProductHandler = async (msg, callback) => {
    var res = {}
    try {
        const products = await Product.findAll({include: [{ model:ProductImages,as:'productImages'} ]});
        res.status = 200
        res.data = JSON.stringify(products);
        callback(null, res);
    } catch (err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

getProductByIdHandler = async (msg, callback) => {
    var res = {}
    const id = msg.id;
    try {
        const rating=await Votes.findAll({
            where: { productId: id },
            attributes: ['productId', [sequelize.fn('AVG',
                sequelize.col('rating')), 'ratingAvg']],
        });
        
        const product = await Product.findOne({
            where:{
                id:id
            },include: [{ model:ProductImages,as:'productImages'}]});
            console.log(rating)
        product.dataValues.rating=rating[0].dataValues.ratingAvg;
        res.status = 200
        res.data = JSON.stringify(product);
        callback(null, res);
    } catch (err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getAllProductHandler') {
        delete msg.path
        getAllProductHandler(msg, callback)

    }
    if (msg.path === "getProductByIdHandler") {
        delete msg.path
        getProductByIdHandler(msg, callback)
    }
};

exports.handle_request = handle_request;