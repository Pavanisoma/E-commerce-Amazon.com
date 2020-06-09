const Customer = require('../mysqlModels/Customer');
const Address = require('../mysqlModels/CustomerAddress');
const Cards = require('../mysqlModels/Card');

getCustomerProfileById = async (msg, callback) => {
    var res = {};
    const id = msg.id;
    try {
        const customer = await Customer.findOne({
            where: {
                id: id
            },include: [{ model: Address, as: 'customerAddresses'},{model:Cards,as:'cards'}]
        });
        if (customer === null) {
            res.status = 404
            res.data = "User not found!";
            callback(null, res)
        }
        // for(let i=0;i<customer.products.length;i++){
        //     customer.products[i]=customer.products[i].cart
        // }

        res.status = 200
        res.data = JSON.stringify(customer);
        callback(null, res);
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }
    
}

getAllCustomerProfile = async (msg, callback) => {
    var res = {}
    try {
        const customers = await Customer.findAll();
        res.status = 200
        res.data = JSON.stringify(customers);
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

    console.log(msg)
    if (msg.path === 'getCustomerProfileById') {
        delete msg.path
        getCustomerProfileById(msg, callback)

    }
    if (msg.path === "getAllCustomerProfile") {
        delete msg.path
        getAllCustomerProfile(msg, callback)
    }
};

exports.handle_request = handle_request;