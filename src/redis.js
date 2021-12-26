const redis = require("redis");

const redisClient = redis.createClient(13142, "redis-13142.c264.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true });

redisClient.auth("F22C7UaLHXolOQqet2gUka5oRy9Aj3L3", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

module.exports = { redisClient }