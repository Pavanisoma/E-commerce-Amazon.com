const Cart = require('../mysqlModels/Cart');
const Product = require('../mysqlModels/Product');
const ProductImages = require('../mysqlModels/productImages');

getCartHandler = async (msg, callback) => {
    var res = {}
    const userId = msg.userId;
    try {
        const cart = await Cart.findOne({ where: { customerId: userId} });

        const product = await Product.findOne({
            where:{
                id:cart.productId
            },include: [{ model:ProductImages,as:'productImages'}]});

            console.log(product)
        var output={...cart.dataValues,...product.dataValues}
        res.status = 200
        res.data = JSON.stringify(output);
        callback(null, res);
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);    
    }
}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getCartHandler') {
        delete msg.path
        getCartHandler(msg, callback)

    }
};

exports.handle_request = handle_request;