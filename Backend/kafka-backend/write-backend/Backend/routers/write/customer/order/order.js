const express=require('express');
const router = express.Router();

router.post('/:userId',async (req, res) => {
    req.body.userId = req.params.userId;
    req.body.path = 'addOrderHandler'
    kafka.make_request('customer-order-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
})

router.delete('/:orderId', async (req, res) => {
  req.body.orderId = req.params.orderId;
  req.body.path = 'cancelOrderHandler';
  kafka.make_request('customer-order-write', req.body, (err, results) => {
 
    console.log(results)
    res.status(results.status).send(JSON.parse(results.data));

  });
})


// router.put('/:orderId', async (req, res) => {
//     try {
//         const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
//         if(!order) {
//             return res.status(404).send('Order not found!');
//         }
//         return res.status(200).send(order);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error!');
//     }
// })


module.exports=router;