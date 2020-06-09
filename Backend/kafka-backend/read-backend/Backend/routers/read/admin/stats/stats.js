const express=require('express');
const router = express.Router();

const kafka=require('./../../../../kafka/client')

router.get('/top/seller/', async (req, res) => {
    req.body.path = 'getTopSellerHandler'
    kafka.make_request('admin-stats-read', req.body, (err, results) => {
 
        console.log(results)
          if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
    
      });

})

router.get('/top/customer/', async (req, res) => {
    req.body.path = 'getTopCustomerHandler'
    kafka.make_request('admin-stats-read', req.body, (err, results) => {
 
        console.log(results)
          if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
    
      });

})


module.exports=router;