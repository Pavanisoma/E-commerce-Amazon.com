const express=require('express');
const router = express.Router();
const votes=require('./votes/votes')
const address=require('./address/address')
const cards=require('./cards/cards')



router.use('/votes',votes);
router.use('/address',address);
router.use('/cards',cards);

router.put('/:id',(req,res)=>{
    


    
})

module.exports=router;