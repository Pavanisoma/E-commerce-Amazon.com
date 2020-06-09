const express = require('express');
const router = express.Router();

router.post('/:userId', async (req, res) => {
    req.body.userId = req.params.userId;
    req.body.path = 'addCardHandler'
    kafka.make_request('customer-profile-cards-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
   
})

router.put('/:cardId', async (req, res) => {
    req.body.cardId = req.params.cardId;
    req.body.path = 'updateCartHandler'
    kafka.make_request('customer-profile-cards-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
   
})

router.delete('/:cardId', async (req, res) => {
    req.body.cardId = req.params.cardId;
    req.body.path = 'deleteCartHandler'
    kafka.make_request('customer-profile-cards-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
})


module.exports=router;