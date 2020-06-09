const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    req.body.path = 'loginHandler'
    kafka.make_request('login-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
})

module.exports = router;