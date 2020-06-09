const Customer=require('../mysqlModels/Customer')
const Address=require('../mysqlModels/CustomerAddress')

addAddressHandler = async (msg, callback) => {
    var res = {}
    const {name,address1,address2,city,state,country,zipCode,phoneNumber} = msg
    const id = msg.userId;
    try {
        const user = await Customer.findOne({
            where: {
                id: msg.userId
            }
        });
        if (user === null) {
            //return res.status(404).send("User not found!");
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
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
                zipCode:zipCode,
                phoneNumber:phoneNumber,
            })
        //return res.status(200).send(newAddress);
            res.status = 200
            res.data = JSON.stringify(newAddress);
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

updateAddressHandler = async (msg, callback) => {
    var res = {}
    const {name, address1, address2, city, state, country, zipCode, phoneNumber} = msg
    const id = msg.addressId;
    try {
        const address = await Address.findOne({
            where: {
                id:id
            }
        });
        if ( address === null) {
            res.status = 404
            res.data = "Address not found!";
            callback(null, res);
        }
        else {
            const newAddress=await Address.update({
                name:name,
                address1:address1,
                address2:address2,
                city:city,
                state:state,
                country:country,
                zipCode:zipCode,
                phoneNumber:phoneNumber,
            },{where:{id:id}})
            res.status = 200
            res.data = JSON.stringify(newAddress);
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

deleteAddressHandler = async (msg, callback) => {
    var res = {}    
    const id = msg.addressId;
    try {
        const address = await Address.destroy({
            where:{
                id:id
            }
        })
        res.status = 200
        res.data = JSON.stringify(address);
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
    if (msg.path === 'addAddressHandler') {
      delete msg.path
      addAddressHandler(msg, callback)
    }
    if (msg.path === 'updateAddressHandler') {
      delete msg.path
      updateAddressHandler(msg, callback)
    }
    if (msg.path === 'deleteAddressHandler') {
        delete msg.path
        deleteAddressHandler(msg, callback)
    }
  };
  
  exports.handle_request = handle_request;