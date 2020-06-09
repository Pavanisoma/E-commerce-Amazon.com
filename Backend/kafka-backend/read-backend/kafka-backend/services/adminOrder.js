const Order = require('../mongoModels/orders');

getAllOrderHandler = async (msg, callback) => {
    var res = {}
    try {
        const orders = await Order.find({});
        res.status = 200;
        res.data = JSON.stringify(orders);
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500;
        res.data = 'Internal Server Error!'
        callback(null, res);
    }
}


function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getAllOrderHandler') {
        delete msg.path
        getAllOrderHandler(msg, callback)

    }
};

exports.handle_request = handle_request;