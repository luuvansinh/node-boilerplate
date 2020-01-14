import config from '../config'

export default {
  isDevelopment: process.env.NODE_ENV === config.getIn(['env', 'development']),
  isProduction: process.env.NODE_ENV === config.getIn(['env', 'production']),
  isTest: process.env.NODE_ENV === config.getIn(['env', 'test']),
}
