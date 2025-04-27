import { redis } from "@/lib/redis";

export async function getUserFromCache(userId: string) {
  const user = await redis.hgetall(`user:${userId}`);
  return user && Object.keys(user).length > 0 ? user : null;
}
