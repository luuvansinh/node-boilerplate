/**
 * Load app config
 */
import { Map } from 'immutable'
import defaults from './cross-env'

const env = process.env.NODE_ENV
let config: any

switch (env) {
  case 'production':
    config = require('./env/production').default
    break
  case 'test':
    config = require('./env/test').default
    break
  default:
    config = require('./env/development').default
    break
}

export default Map({
  ...defaults,
  ...config,
})
