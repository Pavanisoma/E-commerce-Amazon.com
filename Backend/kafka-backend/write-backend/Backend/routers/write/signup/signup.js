const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    req.body.path = 'signupHandler'
    kafka.make_request('signup-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });

})


module.exports = router;