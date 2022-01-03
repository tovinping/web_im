import { get, post, put } from '../utils/fetch'
import { ILoginReq } from '../interface'
interface ILoginSuccess {
  token: string
  refreshToken: string
}
export function login(data: ILoginReq) {
  return post<ILoginSuccess>('/user/login', data)
}
export interface IRegister {
  account: string
  name: string
  password: string
  mail: string
}
export function register(data: IRegister) {
  return post('/user/register', data)
}

export function autoLogin(refreshToken: string) {
  return post<ILoginSuccess>('/user/autoLogin', { refreshToken })
}

export function updateSign(sign: string) {
  return put('/user/sign', {sign})
}
export function getUserInfo(account: string) {
  return get<IUserType>('/user/' + account)
}
export function updateAvatar(avatarUrl: string) {
  return put('/user/avatar', {avatarUrl})
}
interface IForget{
  account: string
  password: string
  mail: string
  verCode: string
}
export function forget(params: IForget) {
  return put('/user/forget', params)
}
interface IGetContactList {
  pageNo?: number
  pageSize?: number
  accounts?: string[]
}
export function getContactList(params: IGetContactList) {
  return get<IUserType[]>('/user/list', params)
}