import { IResult } from '../interface'

export default (promise: any): IResult => {
  return promise
    .then((data: any) => {
      return { error: null, data }
    }).catch((error: any) => {
      return { error }
    })
}
