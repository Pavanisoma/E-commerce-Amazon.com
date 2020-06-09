const connection = require('./kafka/connection');

const adminCategory = require('./services/adminCategory');
const adminOrder = require('./services/adminOrder');
const adminStats = require('./services/adminStats');
const customerCart = require('./services/customerCart');
const customerComments = require('./services/customerComments');
const customerOrder = require('./services/customerOrder');
const customerProfile = require('./services/customerProfile');
const customerVotes = require('./services/customerVotes');
const products = require('./services/products');
const sellerProducts = require('./services/sellerProducts');
const sellerProfile = require('./services/sellerProfile');

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

handleTopicRequest("admin-category-read", adminCategory);
handleTopicRequest("admin-stats-read", adminStats);
handleTopicRequest("admin-order-read", adminOrder);
handleTopicRequest("customer-cart-read", customerCart);
handleTopicRequest("customer-comments-read", customerComments);
handleTopicRequest("customer-order-read", customerOrder);
handleTopicRequest("customer-profile-read", customerProfile);
handleTopicRequest("customer-votes-read", customerVotes);
handleTopicRequest("products-read", products);
handleTopicRequest("seller-products-read", sellerProducts);
handleTopicRequest("seller-profile-read", sellerProfile);

