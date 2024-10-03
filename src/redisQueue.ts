import IORedis from 'ioredis';
import { INotification } from "./interfaces/INotification";

export class redisQueue {
  private readonly redis: IORedis;

  constructor(redisUrl: string) {
    this.redis = new IORedis(redisUrl);
  }

  // id, name, type, status, content, expireDate (notificationId = type + id)
  add = async (userId: string, notificationId: string, newNotification: Omit<INotification, 'ack'>): Promise<string> => {
    const key = `user:${userId}:notifications`;
    const notificationJson = await this.redis.hget(key, notificationId);

    if (notificationJson) {
      const existingNotification: INotification = JSON.parse(notificationJson);
      const updatedNotification = { ...existingNotification, ...newNotification };
      await this.redis.hset(key, notificationId, JSON.stringify(updatedNotification));
      console.log(`Updated notification ${notificationId} for user ${userId}:`, updatedNotification);
    } else {
      await this.redis.hset(key, notificationId, JSON.stringify(newNotification));
      console.log(`Added notification for user ${userId}:`, newNotification);
    }
    return notificationId;
  };

  getNotifications = async (userId: string): Promise<INotification[]> => {
    const key = `user:${userId}:notifications`;
    const notifications = await this.redis.hgetall(key);

    return Object.values(notifications).map(n => JSON.parse(n) as INotification);
  };

  deleteExpiredNotifications = async (userId: string): Promise<void> => {
    const key = `user:${userId}:notifications`;
    const notifications = await this.redis.hgetall(key);

    const currentDate = new Date().toISOString();

    for (const [notificationId, notificationJson] of Object.entries(notifications)) {
      const notification: INotification = JSON.parse(notificationJson);
      if (notification.expireDate < currentDate) {
        await this.redis.hdel(key, notificationId);
        console.log(`Deleted expired notification ${notificationId} for user ${userId}`);
      }
    }
  };
}
