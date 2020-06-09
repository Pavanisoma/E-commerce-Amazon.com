const express = require('express');
const router = express.Router();
const kafka = require('./../../../../kafka/client')


const redisRead = require('./../../../../db/RedisRead')
const redisWrite = require('./../../../../db/RedisWrite')

router.get('/:id', async (req, res) => {
  req.body.id = req.params.id;
  req.body.path = 'getCustomerProfileById'
  // await redisWrite.del('profile_' + req.params.id)
  redisRead.get('profile_' + req.params.id, async (err, profile) => {

    if (profile != null) {
      console.log("inside redis")
      return res.status(200).send(JSON.parse(profile));
    }
    else {
      kafka.make_request('customer-profile-read', req.body, (err, results) => {

        console.log(results)
        if (results.status === 200)
          res.status(results.status).send(JSON.parse(results.data));
        else
          return res.sendStatus(results.status)
          return redisWrite.setex('profile_' + req.params.id, 36000, results.data);

      });
    }
  })
})


router.get('/', async (req, res) => {
  req.body.path = 'getAllCustomerProfile'
  kafka.make_request('customer-profile-read', req.body, (err, results) => {

    console.log(results)
    if (results.status === 200)
      res.status(results.status).send(JSON.parse(results.data));
    else
      res.sendStatus(results.status)

  });

})

module.exports = router;