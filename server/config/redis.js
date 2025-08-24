const { createClient } = require("redis");

let redisClient = null;

if (process.env.REDIS_URL) {
  redisClient = createClient({ url: process.env.REDIS_URL });

  let redisFailed = false;
  redisClient.on("error", (err) => {
    if (!redisFailed) {
      console.error("Redis Client Error (disabled):", err.message);
      redisFailed = true;
      redisClient = null; // disable cache
    }
  });

  redisClient.on("connect", () => console.log("✅ Redis Connected"));

  (async () => {
    try {
      await redisClient.connect();
    } catch (err) {
      if (!redisFailed) {
        console.error(
          "Redis connection failed, caching disabled:",
          err.message
        );
        redisClient = null;
        redisFailed = true;
      }
    }
  })();
} else {
  console.log("⚠️ REDIS_URL not set, caching disabled");
}

module.exports = redisClient;
