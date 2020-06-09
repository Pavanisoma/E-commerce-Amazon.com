const express = require('express');
const router = express.Router();

const kafka=require('./../../../kafka/client')

const redisRead=require('./../../../db/RedisRead')
const redisWrite=require('./../../../db/RedisWrite')
router.get('/', async (req, res) => {
    req.body.path = 'getAllProductHandler';
    kafka.make_request('products-read', req.body, (err, results) => {
  
        console.log(results)
         if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
  
      });
})

router.get('/:id', async (req, res) => {
    req.body.id = req.params.id;
    req.body.path = 'getProductByIdHandler'

    redisRead.get('product_' + req.params.id, async (err, productRedis) => {
      if (productRedis != null) {
          console.log("Inside Redis!")
          return res.status(200).send(JSON.parse(productRedis));
      }
      else {
        kafka.make_request('products-read', req.body, (err, results) => {
  
          console.log(results)
           if(results.status===200)
           res.status(results.status).send(JSON.parse(results.data));
           else
           return res.sendStatus(results.status)
           return redisWrite.setex('product_' + req.params.id, 36000, results.data);
        });
          
      }
  });





    

})


module.exports = router;