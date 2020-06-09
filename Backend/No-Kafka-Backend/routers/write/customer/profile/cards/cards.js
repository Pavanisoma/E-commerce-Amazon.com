const express=require('express');
const router = express.Router();
const Customer=require('./../../../../../mysqlModels/Customer')
const Card=require('./../../../../../mysqlModels/Card')



router.post('/:userId',async (req,res)=>{
    const {name,cardNumber,expirationDate,cvv}=req.body
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
            const newCard=await Card.create({
                customerId:id,
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv,
                name:name,
            })
        return res.status(200).send(newCard);
        }
        
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
   
})

router.put('/:cardId',async (req,res)=>{
    const {name,cardNumber,expirationDate,cvv}=req.body
    const id=req.params.cardId;
    try {
        const card = await Card.findOne({
            where: {
                id:id
            }
        });
        if ( card=== null) {
            return res.status(404).send("Card not found!");
        }
        else {
            const card=await Card.update({
                customerId:id,
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv,
                name:name,
            },{where:{id:id}})

        return res.status(200).send(card);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
   
})



router.delete('/:cardId',async (req,res)=>{
    const id=req.params.cardId;
    try {
        await Card.destroy({
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