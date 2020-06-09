const express=require('express');
const router = express.Router();

const kafka=require('./../../../../kafka/client')

router.get('/', async (req, res) => {
    req.body.path = 'getAllCategoryHandler'
    kafka.make_request('admin-category-read', req.body, (err, results) => {
 
        console.log(results)
          if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
    
      });

})

router.get('/:id', async (req, res) => {
    req.body.id = req.params.id;
    req.body.path = 'getCategoryByIdHandler'
    kafka.make_request('admin-category-read', req.body, (err, results) => {
 
        console.log(results)
          if(results.status===200)
         res.status(results.status).send(JSON.parse(results.data));
         else
         res.sendStatus(results.status)
    
      });
    
})


module.exports=router;