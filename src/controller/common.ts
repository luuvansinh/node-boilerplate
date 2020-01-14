import { IRequest, IResponse } from '../interface'
import { response } from '../utils'

const ping = (req: IRequest, res: IResponse) => {
  response.r200(res, 'vi', { ping: 'pong' })
}

export default {
  ping,
}
