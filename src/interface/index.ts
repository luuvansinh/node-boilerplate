import { Request, Response, NextFunction } from 'express'

export interface IRequest extends Request {
  locale: string
  user: any // TODO: define user interface
}

export interface IResponse extends Response { }

export interface INextFunction extends NextFunction { }

export interface IResult {
  data?: any
  error?: any
}
