const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');
const Seller = require('../../../mysqlModels/Seller');
const Product = require('../../../mysqlModels/Product');



aws.config.update({
    secretAccessKey: config.get('secretAccessKey'),
    accessKeyId: config.get('accessKeyId'),
    region: 'us-east-1'
  });
  
const s3 = new aws.S3();
  
const uploadProductPhoto = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'amazon-273',
        key: function (req, file, cb) {
          console.log(req.params.id);
            cb(null, 'products/prod_' + req.params.id);
        }
    })
  });

router.post('/:id', async (req, res) => {
    const sellerId = req.params.id;
    try {
        const seller = await Seller.findOne({
            where: {
                id: sellerId
            }
        })
        if (seller === null) {
            return res.status(404).send('User not found!');
        }
        const product = await Product.create({
            productName: req.body.productName,
            sellerName: req.body.sellerName,
            price: req.body.price,
            rating: req.body.rating,
            inventory: req.body.inventory,
            description: req.body.description,
            sellerId: req.body.sellerId,
            categoryId: req.body.categoryId
        })
        return res.status(201).send(product);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error!');
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({
            where: {
                id: id
            }
        });
        if (product === null) {
            return res.status(404).send("Product not found!");
        }
        else {
            const updatedProduct = await Product.update({
                productName: req.body.productName,
                sellerName: req.body.sellerName,
                price: req.body.price,
                rating: req.body.rating,
                inventory: req.body.inventory,
                description: req.body.description,
                sellerId: req.body.sellerId,
                categoryId: req.body.categoryId
            }, { where: { id: id } })
            return res.status(200).send(updatedProduct);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.sendStatus(500);
})

router.delete('/:id', (req, res) => {
    const id=req.params.id;
    try {
        const result=product.destroy({
            where:{
                id:id
            }
        })
        return res.sendStatus(200);
        }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");  
})

router.put('/:id/uploads', uploadProductPhoto.array('upl', 5), async (req, res) => {
    //const productId = req.params.id;
    try {
        //const  = await Customer.update({profilePicUrl: `https://amazon-273.s3.amazonaws.com/customer/profile_${customerId}`}, {where: {id: customerId}});
        //console.log(customer);
        return res.status(200).send('uploaded');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }   
    
})

module.exports = router;