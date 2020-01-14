/* tslint:disable: no-console */
import Redis from 'ioredis'
import { EventEmitter } from 'events'
import config from '../config'

// Init redis
let redis = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')
const sub = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')

sub.subscribe(config.getIn(['redisKey', 'channel']))

const runRedis = (mediator: EventEmitter) => {
  redis = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')
  redis.on('ready', () => {
    mediator.emit('redis.ready')
  })

  redis.on('error', (err: any) => {
    console.log('redis.error', err)
    // Exit app
    process.exit(1)
  })
}

const getStore = () => {
  return redis
}

const set = async (key: string, value: any) => {
  const store = getStore()
  await store.set(key, value)
}

const get = async (key: string) => {
  const store = getStore()
  const value = await store.get(key)
  return value
}

const deleteByKey = async (key: string) => {
  const store = getStore()
  await store.del(key)
}

export default {
  runRedis,
  getStore,
  set,
  get,
  deleteByKey,
}
