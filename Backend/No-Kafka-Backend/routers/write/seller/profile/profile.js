const express=require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();
const Seller = require('../../../../mysqlModels/Seller');

const s3 = new aws.S3();
  
const uploadProfilePhoto = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'amazon-273',
        key: function (req, file, cb) {
          console.log(req.params.id);
            cb(null, 'seller/profile_' + req.params.id);
        }
    })
  });

  router.put('/:sellerId', async (req, res) => {
      const {name, address1, address2, city, state, country, zipcode} = req.body;
      try { 
        const updateSeller = await Seller.update({
            name: name,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode
        }, {where: {id: sellerId}});
        return res.status(200).send(updateSeller);

      } catch(err) {
          console.log(err);
          return res.status(500).send('Internal Server Error!');
      }
  })
  router.put('/upload/:id', uploadProfilePhoto.array('upl', 1), async (req, res) => {
    const sellerId = req.params.id;
    try {
        const seller = await Seller.update({profilePicUrl: `https://amazon-273.s3.amazonaws.com/seller/profile_${sellerId}`}, {where: {id: sellerId}});
        console.log(seller);
        return res.status(200).send(seller);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }   

    
})
router.put('/data/:id', async (req, res) => {
    const id = req.params.id;
    const {name,address1,address2,city,state,country,zipcode}=req.body
    try {
        const seller = await Seller.findOne({
            where: {
                id:id
            }
        });
        if ( seller=== null) {
            return res.status(404).send("Seller not found!");
        }
        else {
            const newSeller=await Seller.update({
                name:name,
                address1:address1,
                address2:address2,
                city:city,
                state:state,
                country:country,
                zipcode:zipcode,
            },{where:{id:id}})

        return res.status(200).send(newSeller);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});


module.exports=router;