// utils/cache.js
const redisClient = require("../config/redis");

const TTL = process.env.REDIS_TTL ? parseInt(process.env.REDIS_TTL) : 60;

const safeRedisOp = async (op, ...args) => {
  if (!redisClient?.isReady) return null; // fallback immediately if Redis not ready
  try {
    return await op(...args);
  } catch {
    return null; // fallback silently on errors
  }
};

const cache = async (key, fetchFn, ttl = TTL) => {
  // Try to get cached value
  const cached = await safeRedisOp(redisClient.get.bind(redisClient), key);
  if (cached) return JSON.parse(cached);

  // Fetch from DB
  const fresh = await fetchFn();

  // Try to cache
  await safeRedisOp(
    redisClient.setEx.bind(redisClient),
    key,
    ttl,
    JSON.stringify(fresh)
  );

  return fresh;
};

cache.invalidate = async (key) => {
  await safeRedisOp(redisClient.del.bind(redisClient), key);
};

module.exports = cache;
