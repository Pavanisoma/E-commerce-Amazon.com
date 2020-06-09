const express = require('express');
const router = express.Router();
// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const config = require('config');
const Seller = require('../../../mysqlModels/Seller');
const Product = require('../../../mysqlModels/Product');
const ProductImages = require('../../../mysqlModels/productImages');


AWS.config.update({
    secretAccessKey: config.get('secretAccessKey'),
    accessKeyId: config.get('accessKeyId'),
    region: 'us-east-1'
  });

AWS.config.setPromisesDependency(bluebird);
  
const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: 'amazon-273',
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };
  
// const uploadProductPhoto = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: 'public-read',
//         bucket: 'amazon-273',
//         key: function (req, file, cb) {
//           console.log(req.params.id);
//             cb(null, 'products/prod_' + req.params.id);
//         }
//     })
//   });

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
            sellerId: sellerId,
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
        const result=Product.destroy({
            where:{
                id:id
            }
        })
        return res.status(200).send("deleted");
        }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");  
})

router.put('/:id/uploads', async (req, res) => {
    const id = req.params.id;
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        console.log(files);
        //return res.status(200).send("done");
        for (var key in files) {
            const {path, fieldName} = files[key][0];
            const buffer = fs.readFileSync(path);
            const type = await fileType.fromBuffer(buffer)
            //const timestamp = Date.now().toString();
            const fileName = `products/${id}/${fieldName}`;
            const data = await uploadFile(buffer, fileName, type);
            if(key === 1 || key === "1") {
                const product = await Product.update({thumbNail: `https://amazon-273.s3.amazonaws.com/products/${id}/1.jpg`},{where:{
                    id:id
                }})
            }
            const productImage = await ProductImages.create({imageUrl: `https://amazon-273.s3.amazonaws.com/products/${id}/${key}.jpg`,
        productId:id})
            console.log(data);
          }
          
        return res.status(200).send("done");
      } catch (err) {
          console.log(err)
          return res.status(400).send(err);
      }
    });
    
})

module.exports = router;