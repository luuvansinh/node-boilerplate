import { localesKey } from '../locales'

/**
 * Get message from error object
 *
 * @param error
 */
const message = (error: any) => {
  if (!error) {
    return localesKey.common.serverError
  }

  if (error.errorKey) {
    return error.errorKey
  }

  let code = localesKey.common.serverError
  if (error.name === 'MongoError' || error.name === 'BulkWriteError') {
    switch (error.code) {
      case 11000:
        code = localesKey.common.dataAlreadyExisted
        break;
      default:
        code = localesKey.common.serverError
        break;
    }
  } else if (error.errors) {
    code = error.errors[Object.keys(error.errors)[0]]
      ? error.errors[Object.keys(error.errors)[0]].message
      : localesKey.common.serverError
  }

  return code
}

/**
 * Get error from promise (using "to" function)
 *
 * @param {Object} error
 */
const fromPromise = ({ error }: any) => {
  if (error) {
    return message(error)
  }
  return ''
}

export default {
  message,
  fromPromise,
}
