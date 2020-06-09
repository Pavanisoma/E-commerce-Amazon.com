const Votes = require('../mysqlModels/votes');
const Customer = require('../mysqlModels/Customer');

getVotesByCustomerId = async (msg, callback) => {
    var res = {}
    const userId = msg.userId;
    try {
        const customer = await Customer.findOne({
            where: {
                id: userId
            }});
        if (customer === null) {
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
        }
        const votes = await Votes.findAll({ where: { customerId: userId}});
        res.status = 200
        res.data = JSON.stringify(votes);
        callback(null, res);
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
}

getVotesByProductId = async (msg, callback) => {
    var res = {}
    const productId = msg.productId;
    try {
        const customer = await Customer.findOne({
            where: {
                id: msg.userId
            }});
        if (customer === null) {
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
        }
        const votes = await Votes.findAll({ where: { productId: productId}});
        res.status = 200
        res.data = JSON.stringify(votes);
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
    if (msg.path === 'getVotesByCustomerId') {
        delete msg.path
        getVotesByCustomerId(msg, callback)

    }
    if (msg.path === "getVotesByProductId") {
        delete msg.path
        getVotesByProductId(msg, callback)
    }
};

exports.handle_request = handle_request;