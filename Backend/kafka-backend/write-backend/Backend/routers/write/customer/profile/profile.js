const express=require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();
const votes=require('./votes/votes')
const address=require('./address/address')
const cards=require('./cards/cards')
const Customer = require('../../../../mysqlModels/Customer');
const config = require('config');



router.use('/votes',votes);
router.use('/address',address);
router.use('/cards',cards);


aws.config.update({
    secretAccessKey: config.get('secretAccessKey'),
    accessKeyId: config.get('accessKeyId'),
    region: 'us-east-1'
  });
  
const s3 = new aws.S3();
  
const uploadProfilePhoto = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'amazon-273',
        key: function (req, file, cb) {
          console.log(req.params.id);
            cb(null, 'customer/profile_' + req.params.id);
        }
    })
  });

router.put('/:id', uploadProfilePhoto.array('upl', 1), async (req, res) => {
    const customerId = req.params.id;
    try {
        const customer = await Customer.update({profilePicUrl: `https://amazon-273.s3.amazonaws.com/customer/profile_${customerId}`}, {where: {id: customerId}});
        console.log(customer);
        return res.status(200).send('uploaded');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }   
    
})

module.exports=router;