const Customer = require('../mysqlModels/Customer')
const Card = require('../mysqlModels/Card')

addCardHandler = async (msg, callback) => {
    var res = {}
    const {name, cardNumber, expirationDate, cvv} = msg
    const id = msg.userId;
    try {
        const user = await Customer.findOne({
            where: {
                id: msg.userId
            }
        });
        if (user === null) {
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
        }
        else {
            const newCard=await Card.create({
                customerId:id,
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv,
                name:name,
            })
        //return res.status(200).send(newCard);
            res.status = 200
            res.data = JSON.stringify(newCard);
            callback(null, res);
        }
        
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

updateCardHandler = async (msg, callback) => {
    var res = {}
    const {name, cardNumber, expirationDate, cvv} = msg
    const id = msg.cardId;
    try {
        const card = await Card.findOne({
            where: {
                id:id
            }
        });
        if ( card === null) {
            res.status = 404
            res.data = "Card not found!";
            callback(null, res);
        }
        else {
            const card = await Card.update({
                customerId:id,
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv,
                name:name,
            },{where:{id:id}})
            res.status = 200
            res.data = JSON.stringify(card);
            callback(null, res);
            
        }
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

deleteCardHandler = async (msg, callback) => {
    var res = {}
    const id=msg.cardId;
    try {
        await Card.destroy({
            where:{
                id:id
            }
        })
        
        res.status = 200
        callback(null, res);
        }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }

}

function handle_request(msg, callback) {
    if (msg.path === 'addCardHandler') {
      delete msg.path
      addCardHandler(msg, callback)
    }
    if (msg.path === 'updateCardHandler') {
      delete msg.path
      updateCardHandler(msg, callback)
    }
    if (msg.path === 'deleteCardHandler') {
        delete msg.path
        deleteCardHandler(msg, callback)
    }
  };
  
  exports.handle_request = handle_request;