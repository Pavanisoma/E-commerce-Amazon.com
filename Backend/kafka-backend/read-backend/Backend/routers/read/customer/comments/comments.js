const express = require('express');
const router = express.Router();

const kafka=require('./../../../../kafka/client')

router.get('/:userId', async (req, res) => {
    req.body.userId = req.params.userId;
    req.body.path = 'getCommentHandler'
    kafka.make_request('customer-comments-read', req.body, (err, results) => {
        console.log(results)
          if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
    
      });
    
})

// router.get('/product/:productId ', async (req, res) => {

//     try {
//         const customer = await Customer.findOne({
//             where: {
//                 id: req.params.userId
//             }});
//         if (customer === null) {
//             return res.status(404).send("User not found!");
//         }
//         const comments = await Comments.findAll({ where: { productId: req.params.productId}});
//         return res.status(200).send(comments);
//     }
//     catch (err) {
//         console.log(err);
//     }
//     return res.status(500).send("Internal Server Error!");
// })

module.exports = router;