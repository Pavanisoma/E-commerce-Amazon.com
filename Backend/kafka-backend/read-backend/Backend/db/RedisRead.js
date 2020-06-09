const redis = require("redis");



const redisHost="redisRead-117e47c355fa1b20.elb.us-west-2.amazonaws.com"
const redisPort="6379"

const redisClient = redis.createClient(redisPort, redisHost);

redisClient.on("connect", (err) =>  {
    if(err){
        console.log("Error while connecting to Redis server");
    }
    else {
        console.log("Redis Server Connected");
    }
});

module.exports = redisClient;