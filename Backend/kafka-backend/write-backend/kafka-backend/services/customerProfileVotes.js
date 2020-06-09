const Customer = require('../mysqlModels/Customer')
const Votes = require('../mysqlModels/votes')
const Product = require('../mysqlModels/Product')

addVoteHandler = async (msg, callback) => {
    var res = {}
    const { rating } = msg
    const userId = msg.userId;
    const productId = msg.productId;
    try {
        const user = await Customer.findOne({
            where: {
                id: userId
            }
        });
        if (user === null) {
            //return res.sendStatus(404);
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
        }
        else {
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            if (product === null) {
                //return res.sendStatus(404);
                res.status = 404
                res.data = "Product not found!";
                callback(null, res);
            }
            else {
                const newVote = await Votes.create({
                    rating: rating,
                    customerId: userId,
                    productId: productId
                })
                //return res.status(200).send(newVote);
                res.status = 200
                res.data = JSON.stringify(newVote);
                callback(null, res);
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

updateVoteHandler = async (msg, callback) => {
    var res = {}
    const { rating } = msg
    const id = msg.id;
    try {
        const votes = await Votes.findOne({
            where: {
                id: id
            }
        });
        if (votes === null) {
            res.status = 404
            res.data = "Votes not found!";
            callback(null, res);
        }
        else {
            const updatedVote = await Votes.update({
                rating: rating,
            }, { where: { id: id } })
            //return res.status(200).send(updatedVote);
            res.status = 200
            res.data = JSON.stringify(updatedVote);
            callback(null, res);
        }
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

deleteVoteHandler = async (msg, callback) => {
    var res = {}
    const id = msg.id;
    try {
        const result = await Votes.destroy({
            where: {
                id: id
            }
        })
        res.status = 200
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
    if (msg.path === 'addVoteHandler') {
      delete msg.path
      addVoteHandler(msg, callback)
    }
    if (msg.path === 'updateVoteHandler') {
      delete msg.path
      updateVoteHandler(msg, callback)
    }
    if (msg.path === 'deleteVoteHandler') {
        delete msg.path
        deleteVoteHandler(msg, callback)
    }
  };
  
  exports.handle_request = handle_request;