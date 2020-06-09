const connection = require('./kafka/connection');

const adminCategory = require('./services/adminCategory');
const adminOrder = require('./services/adminOrder');
const comments = require('./services/comments');
const customerCart = require('./services/customerCart');
const customerOrder = require('./services/customerOrder');
const customerProfile = require('./services/customerProfile');
const customerProfileAddress = require('./services/customerProfileAddress');
const customerProfileCards = require('./services/customerProfileCards');
const customerProfileVotes = require('./services/customerProfileVotes');
const login = require('./services/login');
const products = require('./services/products');
const sellerOrder = require('./services/sellerOrder');
const sellerProfile = require('./services/sellerProfile');
const signup = require('./services/signup');

require('./db/MongoDatabase');
require('./db/SQLdatabase');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}

handleTopicRequest("admin-category-write", adminCategory);
handleTopicRequest("admin-order-write", adminOrder);
handleTopicRequest("comments-write", comments);
handleTopicRequest("customer-cart-write", customerCart);
handleTopicRequest("customer-order-write", customerOrder);
handleTopicRequest("customer-profile-write", customerProfile);
handleTopicRequest("customer-profile-addres-write", customerProfileAddress);
handleTopicRequest("customer-profile-cards-write", customerProfileCards);
handleTopicRequest("customer-profile-votes-write", customerProfileVotes);
handleTopicRequest("products-write", products);
handleTopicRequest("login-write", login);
handleTopicRequest("seller-order-write", sellerOrder);
handleTopicRequest("seller-profile-write", sellerProfile);
handleTopicRequest("signup-write", signup);


