const Comments = require('../mysqlModels/Comments');
const Customer = require('../mysqlModels/Customer');

getCommentHandler = async (msg, callback) => {
    var res = {}
    const userId = msg.userId
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
        const comments = await Comments.findAll({ where: { customerId: userId}});
        res.status = 200
        res.data = JSON.stringify(comments);
        callback(null, res);
    }
    catch (err) {
        console.log(err);
        res.status = 500;
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getCommentHandler') {
        delete msg.path
        getCommentHandler(msg, callback)

    }
   
};

exports.handle_request = handle_request;