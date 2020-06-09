const express = require('express');
const router = express.Router();

const kafka=require('./../../../../kafka/client')
//GET Seller by Id
router.get('/:id', async (req, res) => {
  req.body.id = req.params.id;
  req.body.path = 'getSellerByIdHandler'
  kafka.make_request('profile', req.body, (err, results) => {
  
    console.log(results)
     if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)

  });
  
});

//Get All Sellers
router.get('/', async (req, res) => {
  req.body.path = 'getAllSellerHandler';
  kafka.make_request('profile', req.body, (err, results) => {
  
    console.log(results)
     if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)

  });
    
});

module.exports = router;
