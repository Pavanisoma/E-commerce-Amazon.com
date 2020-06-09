const redis = require("redis");



const redisHost="18.237.76.140"
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