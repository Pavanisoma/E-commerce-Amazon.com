const Product = require('../mysqlModels/Product');

getSellerProductHandler = async (msg, callback) => {
    var res = {}
    const id = msg.id;
    try {
        const products = await Product.findAll({
            where: {
                sellerId: id,
            },
        });
        if (products === null) {
            res.Status = 404;
            res.data = 'Product not found!';
            callback(null, res);

        }
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

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getSellerProductHandler') {
        delete msg.path
        getSellerProductHandler(msg, callback)

    }
};

exports.handle_request = handle_request;