import { createClient } from 'redis';

// Redis istemcisi oluşturma
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

// Bağlantı olayları
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Redis istemcisini başlat
(async () => {
  try {
    await redisClient.connect(); // Bağlantıyı etkinleştir
  } catch (err) {
    console.error('Redis connection failed:', err);
  }
})();

export default redisClient;
