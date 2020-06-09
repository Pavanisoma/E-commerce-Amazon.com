const Sale = require('../mongoModels/sales');
const Purchase = require('../mongoModels/customerPurchase');

getTopSellerHandler = async (msg, callback) => {
    var res = {}
    try {
        const sellers = await Sale.find({}).sort({sales: -1}).limit(5);
        res.status = 200
        res.data = JSON.stringify(sellers);
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

getTopCustomerHandler = async (msg, callback) => {
    var res = {}
    try {
        const customers = await Purchase.find({}).sort({purchase: -1}).limit(5);
        res.status = 200
        res.data = JSON.stringify(customers);
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getTopSellerHandler') {
        delete msg.path
        getTopSellerHandler(msg, callback)

    }
    if (msg.path === "getTopCustomerHandler") {
        delete msg.path
        getTopCustomerHandler(msg, callback)
    }
};

exports.handle_request = handle_request;