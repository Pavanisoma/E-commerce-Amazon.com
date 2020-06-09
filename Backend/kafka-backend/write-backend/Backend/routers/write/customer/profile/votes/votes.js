const express = require('express');
const router = express.Router();

router.post('/:userId/:productId', async (req, res) => {
    req.body.userId = req.params.userId;
    req.body.productId = req.params.productId;
    req.body.path = 'addVoteHandler'
    kafka.make_request('customer-profile-votes-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });

})

router.delete('/:id', async (req, res) => {
    req.body.id = req.params.id;
    req.body.path = 'deleteVoteHandler'
    kafka.make_request('customer-profile-votes-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
})

router.put('/:id', async (req, res) => {
    req.body.id = req.params.id;
    req.body.path = 'updateVoteHandler'
    kafka.make_request('customer-profile-votes-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });

})

module.exports = router;