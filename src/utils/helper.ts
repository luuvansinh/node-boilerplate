import redis from '../init/redis'
import env from './env'

/**
 * Get locale
 *
 * @param {Object} req
 */
const getLocale = (req: any) => {
  return req.locale
}

/**
 * Parse JSON
 *
 * @param value
 * @param defaultValue
 */
const parseJSONString = (value: string, defaultValue?: any) => {
  try {
    JSON.parse(value)
    return JSON.parse(value)
  } catch (e) {
    return defaultValue
  }
}

/**
 * Set key value to redis
 *
 * @param {String} key
 * @param value
 */
const setRedisKeyValue = async (key: string, value: any) => {
  if (!key) { return }
  value = JSON.stringify(value)

  // Set key for test env
  if (env.isTest) {
    key = `test_${key}`
  }

  await redis.set(key, value)
}

/**
 * Get key data from redis
 *
 * @param {String} key
 * @param {Boolean} parseToObject parse string to object after get
 *
 */
const getRedisDataByKey = async (key: string, parseToObject: boolean) => {
  // Set key for test env
  if (env.isTest) {
    key = `test_${key}`
  }

  const value = await redis.get(key)
  return parseToObject ? JSON.parse(value) : value
}


/**
 * Publish data to a channel
 *
 * @param {String} channel channel name
 * @param {String} message message will send
 */
const redisPublish = async (channel: string, message: string) => {
  const store = await redis.getStore()
  store.publish(channel, message)
}

export default {
  parseJSONString,
  getLocale,
  getRedisDataByKey,
  setRedisKeyValue,
  redisPublish,
}
