/* tslint:disable: no-console */
import config from '../config'
import code from './code'
import en from './langs/en'
import vi from './langs/vi'
import { GlobalCustom } from '../lib/global'

declare const global: GlobalCustom

const getCodes = (codes: any): any => {
  const response = {}
  for (const key in codes) {
    if (codes.hasOwnProperty(key)) {
      const element = codes[key];
      for (const k in element) {
        if (element.hasOwnProperty(k)) {
          const item = element[k]
          Object.assign(response, { [k]: item })
        }
      }
    }
  }
  return response
}

const deepCode = getCodes(code)

/**
 * Get locale file
 *
 * @param locale
 */
const getLocaleFile = (locale: string) => {
  switch (locale) {
    case config.getIn(['locales', 'en']):
      return en
    default:
      return vi
  }
}

/**
 * Get code by key
 *
 * @param key
 * @param locale
 */
const getCodeByKey = (key: string, locale: string) => {
  const localeFile = getLocaleFile(locale)
  return {
    code: deepCode[key],
    message: localeFile[key],
  }
}

/**
 * Get key by code
 *
 * @param c Code
 * @param locale
 */
const getKeyByCode = (c: number, locale: string) => {
  const localeFile = getLocaleFile(locale)
  const codeKey = global.codeMap[c]
  if (codeKey) {
    return {
      key: codeKey,
      message: localeFile[codeKey],
    }
  }
}

/**
 * Stop server if duplicate code
 *
 * @param first
 * @param second
 * @param theCode
 */
const throwErrorLocale = (first: any, second: string, theCode: any) => {
  const message = `The code is duplicate: ${first} and ${second} with value: ${theCode}`
  console.log('\x1b[31m', message, '\x1b[0m')
  process.exit(1)
}

/*
 *
 * Validate code
 *
 * */
const validateCode = () => {
  const keys = Object.keys(code)
  const map = []
  keys.forEach((item) => {
    const subCode = code[item]
    const subKeys = Object.keys(subCode)
    subKeys.forEach((subKey) => {
      const firstKey = map[subCode[subKey]]
      if (firstKey) {
        throwErrorLocale(firstKey, subKey, subCode[subKey])
      }
      map[subCode[subKey]] = subKey
    })
  })
  global.codeMap = map
}

export {
  getCodeByKey,
  getKeyByCode,
  validateCode,
}
