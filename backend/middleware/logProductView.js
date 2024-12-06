const redisClient = require('../config/redis');

const logProductView = async (req, res, next) => {
  try {
    const userId =req.userId; 
    const productId = req.params.id; 

    if (!userId || !productId) {
      return res.status(400).json({ message: 'User ID or Product ID missing' });
    }

    
    const redisKey = `recentlyViewed:${userId}`;

  
    const productData = JSON.stringify({ productId, timestamp: Date.now() });
    await redisClient.lPush(redisKey, productData);

    await redisClient.lTrim(redisKey, 0, 9);

    const viewCountKey = `productViews:${productId}`;
    await redisClient.incr(viewCountKey);

    next();
  } catch (error) {
    console.error('Error logging product view:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = logProductView;
