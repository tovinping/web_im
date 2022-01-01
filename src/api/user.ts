import { get, post, put } from '../utils/fetch'
import { ILoginReq } from '../interface'

interface IGetContactList {
  pageNo?: number
  pageSize?: number
  accounts?: string[]
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

export async function updateSign(sign: string) {
  return put('/user/sign', {sign})
}
export async function getUserInfo(account: string) {
  return get<IUserType>('/user/' + account)
}