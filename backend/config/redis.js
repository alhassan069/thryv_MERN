const redis = require('redis');
const redis_connection = process.env.DOCKER_CONTAINER === "true"
  ? {
    url: "redis://redis:6379",
  }
  : {
    host: 'localhost',
    port: 6379,
  };
const redisClient = redis.createClient(redis_connection);


redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;
