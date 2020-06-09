const express=require('express');
const router = express.Router();

// Update order Status by Seller
router.put('/:orderId', async (req, res) => {
    req.body.orderId = req.params.orderId;
    req.body.path = 'updateOrderHandler'
    kafka.make_request('seller-order-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
})


module.exports = router;