const Redis = require("ioredis");

const CacheClient = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
});

CacheClient.on("connect", function(){
    console.log("Redis connected successfully");
});

CacheClient.on("error", function(){
    console.log("Error Redis connection");
});

module.exports = CacheClient;