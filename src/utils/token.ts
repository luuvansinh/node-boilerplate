import { sign } from 'jsonwebtoken'
import config from '../config'

/**
 * @param  {Object} data: payload data
 *
 */
export default (data: any) => {
  // Sending the payload inside the token, expire in 1 year
  return sign(data, config.get('secret'), { expiresIn: '1y' })
}
