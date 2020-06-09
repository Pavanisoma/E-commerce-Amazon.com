const express=require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    req.body.path = 'addCategoryHandler'
    kafka.make_request('admin-category-write', req.body, (err, results) => {
  
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
  
      });

})

router.put('/:id', async (req, res) => {
    req.body.path = 'updateCategoryHandler'
    req.body.id = req.params.id;
    kafka.make_request('admin-category-write', req.body, (err, results) => {
  
        console.log(results)
        res.status(results.status).send(JSON.parse(results.data));
  
      });

})


module.exports=router;