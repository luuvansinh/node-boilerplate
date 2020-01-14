import config from '../../config'

const LOCALE_VI = config.getIn(['locales', 'vi'])
const LOCALE_EN = config.getIn(['locales', 'en'])

/**
 * Generate text for something required
 *
 * @param {String} text target name
 * @param {String} locale locale
 */
const targetRequired = (text: string, locale: string = config.getIn(['locales', 'vi'])) => {
  switch (locale) {
    case config.getIn(['locales', 'en']):
      return `${text} is required`
    default:
      return `${text} không được trống`
  }
}

/**
 * Generate text for something not found
 *
 * @param {String} text target name
 * @param {String} locale locale
 */
const targetNotFound = (text: string, locale: string = config.getIn(['locales', 'vi'])) => {
  switch (locale) {
    case config.getIn(['locales', 'en']):
      return `${text} not found`
    default:
      return `${text} không tìm thấy`
  }
}

/**
 * Generate text for something invalid
 *
 * @param {String} text target name
 * @param {String} locale locale
 */
const targetInvalid = (text: string, locale: string = config.getIn(['locales', 'vi'])) => {
  switch (locale) {
    case config.getIn(['locales', 'en']):
      return `${text} is invalid`
    default:
      return `${text} không đúng định dạng`
  }
}

/**
 * Generate text for something must be a number
 * @param text
 * @param locale
 */
const targetMustbeANumber = (text: string, locale: string = config.getIn(['locales', 'vi'])) => {
  switch (locale) {
    case config.getIn(['locales', 'en']):
      return `${text} must be a number`
    default:
      return `${text} phải là số`
  }
}

/**
 * Generate text for something must be an array
 * @param text
 * @param locale
 */
const targetMustbeAnAray = (text: string, locale: string = config.getIn(['locales', 'vi'])) => {
  switch (locale) {
    case config.getIn(['locales', 'en']):
      return `${text} must be an array`
    default:
      return `${text} phải là mảng`
  }
}

export {
  targetRequired,
  targetNotFound,
  targetInvalid,
  targetMustbeANumber,
  targetMustbeAnAray,
  LOCALE_VI,
  LOCALE_EN,
}
