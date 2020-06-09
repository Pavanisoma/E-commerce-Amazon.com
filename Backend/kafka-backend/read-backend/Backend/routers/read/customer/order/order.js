const express=require('express');
const router = express.Router();

const kafka=require('./../../../../kafka/client')

// router.get('/:orderId', async (req, res) => {
//     try {
//         const order = await Order.findOne({_id: req.params.orderId})
//         if(!order) {
//             return res.status(404).send('Order not found!');
//         }
//         return res.status(200).send(order);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error!')
//     }
// })

router.get('/:userId', async (req, res) => {
    req.body.userId = req.params.userId;
    req.body.path = 'getCustomerOrdersHandler';
    kafka.make_request('customer-order-read', req.body, (err, results) => {
  
        console.log(results)
         if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
  
      });

})


module.exports=router;