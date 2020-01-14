import HttpStatus from 'http-status-codes'
import { Response } from 'express'
import config from '../config'
import { getCodeByKey, localesKey } from '../locales'


const defaultLocale = config.getIn(['locales', 'vi'])
const { success, serverError, invalidParams, dataNotFound, noPermission } = localesKey.common

/**
 * Response data with status code 200 (OK)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {Object} data return data
 * @param {String} errorKey key to get code and message
 */
const r200 = (res: Response, locale: string = defaultLocale, data: object = {}, errorKey: string = success) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.OK).jsonp({
    data,
    ...info,
  })
}

/**
 * Response data with status code 400 (BAD REQUEST)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} errorKey key to get code and message
 */
const r400 = (res: Response, locale: string = defaultLocale, errorKey: string = invalidParams, data = {}) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.BAD_REQUEST).jsonp({
    ...info,
    data,
  })
}

/**
 * Response data with status code 401 (UNAUTHORIZED)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} errorKey key to get code and message
 */
const r401 = (res: Response, locale: string = defaultLocale, errorKey: string = noPermission) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.UNAUTHORIZED).jsonp({
    ...info,
  })
}

/**
 * Response data with status code 404 (NOT FOUND)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} errorKey key to get code and message
 */
const r404 = (res: Response, locale: string = defaultLocale, errorKey: string = dataNotFound) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.NOT_FOUND).jsonp({
    ...info,
  })
}

/**
 * Response data with status code 500 (SERVER ERROR)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 */
const r500 = (res, locale: string = defaultLocale) => {
  const info = getCodeByKey(serverError, locale)
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).jsonp({
    ...info,
  })
}

/**
 * Return response if validation params error
 *
 * @param  {Object}   res response object
 * @param  {Object}   error error object
 */
const validation = (res: Response, error: any, locale: string) => {
  let info = getCodeByKey(invalidParams, locale)

  if (error && error.details) {
    info = getCodeByKey(error.details[0].message, locale)
  }

  return res.status(HttpStatus.BAD_REQUEST).jsonp(info)
}

export default {
  r200,
  r400,
  r401,
  r404,
  r500,
  validation,
}
