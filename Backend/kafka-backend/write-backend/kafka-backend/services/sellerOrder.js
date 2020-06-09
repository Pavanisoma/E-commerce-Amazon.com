const Order = require('../mongoModels/orders');

updateOrderHandler = async (msg, callback) => {
    var res = {}
    const { orderStatus, orderUpdateItem, productId } = msg; 
    try {
        const order = await Order.findById({_id: msg.orderId})
        if(!order) {
            //return res.status(404).send('Order not found!');
            res.status = 404
            res.data = "Order not found!";
            callback(null, res);
        }
        order.products.map((product) => {
            if(product.productId === productId) {
                if(orderStatus) {
                    product.orderStatus = orderStatus;
                }
                if(orderUpdateItem) {
                    const list = [orderUpdateItem, ...product.orderUpdates];
                    product.orderUpdates = list
                }
            }
        })
        await order.save();
        //return res.status(200).send(order);
        res.status = 200
        res.data = JSON.stringify(order);
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
}

function handle_request(msg, callback) {
    if (msg.path === 'updateOrderHandler') {
      delete msg.path
      updateOrderHandler(msg, callback)
    }

  };
  
  exports.handle_request = handle_request;