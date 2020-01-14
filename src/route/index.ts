import { Router } from 'express'

export default () => {
  const api = Router()

  api.use('/', require('./common').default)

  return api
}
