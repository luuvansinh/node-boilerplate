import Joi from 'joi'
import config from '../config'
import response from './response'
import helper from './helper'
import { IRequest, IResponse, INextFunction } from '../interface'

/**
 * Validate body data from client
 */
export default (req: IRequest, res: IResponse, next: INextFunction, schema: any) => {
  const data = ['get'].includes(req.method.toLowerCase()) ? req.query : req.body
  const { error } = Joi.validate(data, schema, {
    allowUnknown: true,
  })

  if (error && process.env.ENV !== config.getIn(['env', 'test'])) {
    const locale = helper.getLocale(req)
    // Response
    return response.validation(res, error, locale)
  }
  next()
}
