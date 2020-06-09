const express=require('express');
const router = express.Router();


// Update order Status by Admin
router.put('/:orderId', async (req, res) => {
    req.body.orderId = req.params.orderId;
    req.body.path = 'updateOrderStatusHandler'
    kafka.make_request('admin-order-write', req.body, (err, results) => {
  
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
  
      });
    
})

router.delete('/:orderId', async (req, res) => {
  req.body.orderId = req.params.orderId;
  req.body.path = 'cancelOrderHandler';
  kafka.make_request('admin-order-write', req.body, (err, results) => {
 
    console.log(results)
    res.status(results.status).send(JSON.parse(results.data));

  });
})


module.exports = router;