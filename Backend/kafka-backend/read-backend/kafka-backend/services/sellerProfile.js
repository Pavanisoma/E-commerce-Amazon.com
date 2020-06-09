const Seller = require('../mysqlModels/Seller');

getSellerByIdHandler = async (msg, callback) => {
  var res = {}
    const id = msg.id;
  try {
    const seller = await Seller.findOne({
      where: {
        id: id,
      },
    });
    if (seller === null) {
        res.Status = 404;
        res.data = 'User not found!';
        callback(null, res);
    }
    res.status = 200
    res.data = JSON.stringify(seller);
    callback(null, res);
  } catch (err) {
    console.log(err);
    res.status = 500
    res.data = 'Internal Server Error!';
    callback(null, res);
  }
}

getAllSellerHandler = async (msg, callback) => {
    try {
        const sellers = await Seller.findAll();
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

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'getSellerByIdHandler') {
        delete msg.path
        getSellerByIdHandler(msg, callback)

    }
    if (msg.path === "getAllSellerHandler") {
        delete msg.path
        getAllSellerHandler(msg, callback)
    }
};

exports.handle_request = handle_request;