/* tslint:disable: no-console */
/* tslint:disable: triple-equals */

/**
 * API authentication
 */
import express from 'express'
import { verify } from 'jsonwebtoken'
import { localesKey } from '../locales'
import config from '../config'
import { response } from '../utils'
import { IRequest } from '../interface'

const router = express.Router()

const DEFAULT_LOCALE = config.getIn(['locales', 'vi'])
// List fields will cast to number by default
const NUMERIC_FIELDS = ['page', 'limit']
const BOOLEAN_FIELDS = []
const WHITE_LIST = []


router.use((req: IRequest, res, next) => {
  // Cast all number in query data to number type instead of string
  for (const key in req.query) {
    if (NUMERIC_FIELDS.indexOf(key) !== -1 && req.query[key] == Number(req.query[key])) {
      req.query[key] = Number(req.query[key])
    }
  }

  // Cast all boolean in query data to boolean type instead of string
  for (const key in req.query) {
    if (BOOLEAN_FIELDS.indexOf(key) !== -1 && req.query[key] == Boolean(req.query[key] == 'true').toString()) {
      req.query[key] = Boolean(req.query[key] == 'true')
    }
  }

  // Get locale to client
  const locale = req.headers['accept-language'] || DEFAULT_LOCALE
  req.locale = locale

  // Skip check token for white list api
  if (WHITE_LIST.includes(req.baseUrl)) {
    // If no token found, user is consider as not authenticated
    return next()
  }

  // Check header for token
  // Use body instead, due to photon not allow header
  const token = req.headers.authorization

  // Decode token
  if (token) {
    // Verifies secret and checks exp
    verify(token.split(' ')[1], config.get('secret'), (error, decoded) => {
      if (error) {
        console.log('*** decode token error', error)
        return response.r401(res, locale, localesKey.common.tokenVerifyFailed)
      }

      // If everything is good, save to request for use in other stuffs
      if (typeof decoded === 'string') {
        decoded = JSON.parse(decodeURIComponent(decoded))
      }

      req.user = decoded
      next()
    })
  } else {
    // If no token found, user is consider as not authenticated
    next()
  }
})

export default router
