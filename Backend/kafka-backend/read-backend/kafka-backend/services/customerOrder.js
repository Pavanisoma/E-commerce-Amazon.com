const Order = require('../mongoModels/orders');

getCustomerOrdersHandler = async (msg, callback) => {
    var res = {}
    const userId = msg.userId;
    try {
        const orders = await Order.find({customerId: userId})
        res.status = 200
        res.data = JSON.stringify(orders);
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500;
        res.data = 'Internal Servr Error!';
        callback(null, res);
    }
}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getCustomerOrdersHandler') {
        delete msg.path
        getCustomerOrdersHandler(msg, callback)

    }

};

exports.handle_request = handle_request;