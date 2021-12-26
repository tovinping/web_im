import { get, post } from '../utils/fetch'
import { ILoginReq } from '../interface'

interface IGetContactList {
  pageNo: number
  pageSize: number
}
interface ILoginSuccess {
  token: string
  refreshToken: string
}
export function getContactList(params: IGetContactList) {
  return get<IUserType[]>('/user/list', params)
}
export async function login(data: ILoginReq) {
  return post<ILoginSuccess>('/user/login', data)
}

export async function autoLogin(refreshToken: string) {
  return post<ILoginSuccess>('/user/autoLogin', { refreshToken })
}
