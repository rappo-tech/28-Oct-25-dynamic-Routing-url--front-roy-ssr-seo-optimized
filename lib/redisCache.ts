//redis.get(),redis.set(),redis.del()

import redis from "./redisClient";
//redis.get()
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key);
    return data;
  } catch (err) {
    console.error('Cache get error:', err);
    return null;
  }
}
//redis.set()
export async function setCache(key: string, data: unknown, ttl = 300) {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (err) {
    console.error('Cache set error:', err);
  }
}
//redis.del()
export async function delCache(key: string) {
  try {
    await redis.del(key);
    console.log(`🗑️ Cache deleted: ${key}`);
  } catch (err) {
    console.error('Cache delete error:', err);
  }
}
