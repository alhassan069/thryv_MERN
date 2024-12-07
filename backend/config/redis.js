const redis = require('redis');
const REDIS_HOST= process.env.REDIS_HOST || 'localhost';
const REDIS_PORT= process.env.REDIS_PORT || 6379 ;
const redis_connection = process.env.DOCKER_CONTAINER === "true"
  ? {
    url: "redis://redis:6379",
  }
  : {
    host: REDIS_HOST,
    port: REDIS_PORT,
  };
const redisClient = redis.createClient(redis_connection);


redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;
