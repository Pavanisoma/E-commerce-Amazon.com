const express=require('express');
const router = express.Router();
const kafka=require('./../../../../kafka/client')


// Get all orders by Admin
router.get('/', async (req, res) => {
    req.body.path = 'getAllOrderHandler'
    kafka.make_request('admin-order-read', req.body, (err, results) => {
 
        console.log(results)
          if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
    
      });

})

module.exports = router;