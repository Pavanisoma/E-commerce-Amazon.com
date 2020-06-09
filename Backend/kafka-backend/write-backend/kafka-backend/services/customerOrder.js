const Order = require('../mongoModels/orders');
const Sale = require('../mongoModels/sales');
const Purchase = require('../mongoModels/customerPurchase');

addOrderHandler = async (msg, callback) => {
    var res = {}
    const customerId = msg.userId;
    try {
        const order = new Order({customerId, ...msg})
        await order.save();

        var customer = await Purchase.findOne({customerId: customerId});
        if(customer !== null) {
            customer.purchase += order.billing.totalPrice;
            await customer.save();
        } else {
            var customer = new Purchase({customerId: customerId, customerName: msg.customerName, purchase: order.billing.totalPrice })
            await customer.save()
        }

        order.products.map(async (product) => {
            var seller = await Sale.findOne({sellerName: product.sellerName})
            console.log("seller", seller);
            if(seller !== null) {
                seller.sales += product.totalPrice;
                await seller.save();
            } else {
                var sale = new Sale({sellerName: product.sellerName, sales: product.totalPrice});
                await sale.save();
            }
        })
        
        res.status = 201
        res.data = JSON.stringify(order);
        callback(null, res);
    } catch(err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
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
    if (msg.path === 'addOrderHandler') {
      delete msg.path
      addOrderHandler(msg, callback)
    }
    if (msg.path === 'cancelOrderHandler') {
        delete msg.path
        cancelOrderHandler(msg, callback)
    }
  };
  
  exports.handle_request = handle_request;