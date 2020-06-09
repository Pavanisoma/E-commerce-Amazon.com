const express=require('express');
const router = express.Router();
const Customer=require('./../../../../../mysqlModels/Customer')
const Address=require('./../../../../../mysqlModels/CustomerAddress')



router.post('/:userId',async (req,res)=>{
    const {name,address1,address2,city,state,country,zipcode,phoneNumber}=req.body
    const id=req.params.userId;
    try {
        const user = await Customer.findOne({
            where: {
                id: req.params.userId
            }
        });
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else {
            const newAddress=await Address.create({
                customerId:id,
                name:name,
                address1:address1,
                address2:address2,
                city:city,
                state:state,
                country:country,
                zipcode:zipcode,
                phoneNumber:phoneNumber,
            })
        return res.status(200).send(newAddress);
        }
        
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
   
})

router.put('/:addressId',async (req,res)=>{
    const {name,address1,address2,city,state,country,zipcode,phoneNumber}=req.body
    const id=req.params.addressId;
    try {
        const address = await Address.findOne({
            where: {
                id:id
            }
        });
        if ( address=== null) {
            return res.status(404).send("Address not found!");
        }
        else {
            const newAddress=await Address.update({
                name:name,
                address1:address1,
                address2:address2,
                city:city,
                state:state,
                country:country,
                zipcode:zipcode,
                phoneNumber:phoneNumber,
            },{where:{id:id}})

        return res.status(200).send(newAddress);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
   
})



router.delete('/:addressId',async (req,res)=>{
    const id=req.params.addressId;
    try {
        await Address.destroy({
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


module.exports=router;