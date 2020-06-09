const express = require('express');
const router = express.Router();
const Seller = require('../../../../mysqlModels/Seller');

//GET Seller by Id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const seller = await Seller.findOne({
      where: {
        id: id,
      },
    });
    if (seller === null) {
      return res.status(404).send('User not found!');
    }
    return res.status(200).send(seller);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error!');
  }
});

//Get All Sellers
router.get('/', async (req, res) => {
    try {
        const sellers = await Seller.findAll();
        return res.status(200).send(sellers);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
});

module.exports = router;
