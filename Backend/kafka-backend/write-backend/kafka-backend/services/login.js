const User = require('../mysqlModels/User')
const Customer = require('../mysqlModels/Customer');
const Seller = require('../mysqlModels/Seller');
const Admin = require('../mysqlModels/Admin');

const Address = require('../mysqlModels/CustomerAddress');
const Cards = require('../mysqlModels/Card');

loginHandler = async (msg, callback) => {
    var res = {}
    try {
        const user = await User.findOne({
            where: {
                email: msg.email
            }
        });
        console.log(user)
        if (user === null) {
            res.status = 404
            res.data = "User not found!";
            callback(null, res);
        }
        else if (user.password === msg.password) {
            if (user.userType === 'customer') {
                const customer = await Customer.findOne({
                    where: {
                        userId: user.id
                    }, include: [{ model: Address, as: 'customerAddresses' }, { model: Cards, as: 'cards' }]
                })
                //res.status(200).send(customer);
                res.status = 200
                res.data = JSON.stringify(customer);
                callback(null, res);
            }
            else if (user.userType === 'seller') {
                const seller = await Seller.findOne({
                    where: {
                        userId: user.id
                    }
                })
                //res.status(200).send(seller);
                res.status = 200
                res.data = JSON.stringify(seller);
                callback(null, res);
            }
            else {
                const admin = await Admin.findOne({
                    where: {
                        userId: user.id
                    }
                })
                //res.status(200).send(admin);
                res.status = 200
                res.data = JSON.stringify(admin);
                callback(null, res);
            }
            return
        }
        res.status = 401
        res.data = "UnAuthorized!";
        callback(null, res)
    }
    catch (err) {
        console.log(err);
        res.status = 500
        res.data = "Internal Server Error!";
        callback(null, res);
    }

}

function handle_request(msg, callback) {
    if (msg.path === 'loginHandler') {
      delete msg.path
      loginHandler(msg, callback)
    }
  };
  
  exports.handle_request = handle_request;
