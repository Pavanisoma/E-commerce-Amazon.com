const Customer = require('../mysqlModels/Customer')
const Cart = require('../mysqlModels/Cart')
const Product = require('../mysqlModels/Product')

addCartHandler = async (msg, callback) => {
    var res = {}
    const { quantity,flag } = msg
    const customerId = msg.userId
    const productId = msg.productId
    try {
        const user = await Customer.findOne({
            where: {
                id: customerId
            }
        });
        if (user === null) {
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
                res.status = 404
                res.data = "Product not found!";
                callback(null, res);
                //return res.sendStatus(404);
            }
            else {
                const newCart = await Cart.create({
                    quantity: quantity,
                    customerId: customerId,
                    productId: productId,
                    flag:flag
                })
                res.status = 200
                res.data = JSON.stringify(newCart);
                callback(null, res);
                //return res.status(200).send(newCart);
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

deleteCartHandler = async (msg, callback) => {
    var res = {}
    const id = msg.id;
    try {
        const result = await Cart.destroy({
            where: {
                customerId: id
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

updateCartHandler = async (msg, callback) => {
    var res = {}
    const { quantity,flag } = msg
    const id = msg.id;
    try {
        const cart = await Cart.findOne({
            where: {
                customerId: id
            }
        });
        if (cart === null) {
            res.status = 404
            res.data = "Cart not found!";
            callback(null, res);
        }
        else {
            const updatedCart = await Cart.update({
                quantity: quantity,
                flag:flag
            }, { where: { customerId: id } })
            res.status = 200
            res.data = JSON.stringify(updatedCart);
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

function handle_request(msg, callback) {
    if (msg.path === 'addCartHandler') {
      delete msg.path
      addCartHandler(msg, callback)
    }
    if (msg.path === 'deleteCartHandler') {
      delete msg.path
      deleteCartHandler(msg, callback)
    }
    if (msg.path === 'updateCartHandler') {
        delete msg.path
        updateCartHandler(msg, callback)
    }

  };
  
  exports.handle_request = handle_request;