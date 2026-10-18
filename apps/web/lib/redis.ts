import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export const incrementCounter = async (key: string, value: number = 1) => {
  return redis.incrby(key, value)
}

export const getCounter = async (key: string) => {
  const val = await redis.get(key)
  return val ? parseInt(val as string) : 0
}

export const setCampaignStats = async (campaignId: string, stats: object) => {
  return redis.setex(`campaign:${campaignId}:stats`, 30, JSON.stringify(stats))
}

export const getCampaignStats = async (campaignId: string) => {
  const val = await redis.get(`campaign:${campaignId}:stats`)
  return val ? JSON.parse(val as string) : null
}
