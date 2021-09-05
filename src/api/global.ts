import { post } from '../utils/fetch'
import { ILoginReq, ILoginRes } from '../interface/login'
export function login(data: ILoginReq) {
  return post<ILoginRes>('/user/login', data)
}
