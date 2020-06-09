const express=require('express');
const router = express.Router();

router.post('/:userId', async (req,res) => {
    req.body.userId = req.params.userId;
    req.body.path = 'addAddressHandler'
    kafka.make_request('customer-profile-addres-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
   
})

router.put('/:addressId', async (req,res) => {
    req.body.addressId = req.params.addressId;
    req.body.path = 'updateAddressHandler'
    kafka.make_request('customer-profile-addres-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
   
})

router.delete('/:addressId', async (req,res) => {
    req.body.addressId = req.params.addressId;
    req.body.path = 'deleteAddressHandler'
    kafka.make_request('customer-profile-addres-write', req.body, (err, results) => {
 
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
    
      });
})


module.exports=router;