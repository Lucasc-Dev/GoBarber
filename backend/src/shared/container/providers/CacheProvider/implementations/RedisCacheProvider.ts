import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: string): Promise<void> {
        
    }

    public async recover(key: string): Promise<string> {
        return "";
    }

    public async invalidate(key: string): Promise<void> {

    }
}