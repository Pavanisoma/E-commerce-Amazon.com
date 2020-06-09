const express = require('express');
const router = express.Router();


const kafka=require('./../../../../kafka/client')

router.get('/:userId', async (req, res) => {
    req.body.userId = req.params.userId;
    req.body.path = 'getVotesByCustomerId'
    kafka.make_request('customer-votes-read', req.body, (err, results) => {
  
        console.log(results)
         if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
  
      });
    
})

router.get('/:productId', async (req, res) => {
    req.body.productId = req.params.productId;
    req.body.path = 'getVotesByProductId'
    kafka.make_request('customer-votes-read', req.body, (err, results) => {
  
        console.log(results)
         if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
  
      });
    
})

module.exports = router;