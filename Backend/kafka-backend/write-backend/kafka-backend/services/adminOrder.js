const Order = require('../mongoModels/orders');

updateOrderStatusHandler = async (msg, callback) => {
    var res = {}
    const { orderStatus, orderUpdateItem, productId } = msg;
    const orderId = msg.orderId; 
    try {
        const order = await Order.findById({_id: orderId})
        if(!order) {
            res.status = 404
            res.data = 'Order not found!';
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
        res.status = 200
        res.data = JSON.stringify(order);
        callback(null, res) 
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = 'Internal Server Error!';
        callback(null, res);
    }
}

cancelOrderHandler = async (msg, callback) => {
    var res = {};
    const orderId = msg.orderId;
    try {
        const result = Order.deleteOne({_id: orderId})
        res.status = 200
        res.data = 'Cancel Order!';
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
}

function handle_request(msg, callback) {
    if (msg.path === 'updateOrderStatusHandler') {
      delete msg.path
      updateOrderStatusHandler(msg, callback)
    }
    if (msg.path === 'cancelOrderHandler') {
        delete msg.path
        cancelOrderHandler(msg, callback)
      }

  };
  
  exports.handle_request = handle_request;