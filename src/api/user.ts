import { get, post, put } from '../utils/fetch'
interface ILoginReq {
  account: string
  password: string
  captchaId: string
  captchaText: string
}
export function login(data: ILoginReq) {
  return post<{ token: string; refreshToken: string }>('/user/login', data)
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

export function autoLogin(account: string, refreshToken: string) {
  return post<{ token: string; refreshToken: string }>('/user/autoLogin', { account, refreshToken })
}

export function updateSign(sign: string) {
  return put('/user/sign', { sign })
}
export function getUserInfo(account: string) {
  return get<IUserType>('/user/' + account)
}
export function updateAvatar(avatarUrl: string) {
  return put('/user/avatar', { avatarUrl })
}

export function getForgotCaptcha(data: {account: string; mail: string}) {
  return put('/user/forgotCaptcha', data)
}
interface  IForgot {
  account: string
  password: string
  mail: string
  captcha: string
}
export function forgot(params:  IForgot) {
  return put('/user/forgot', params)
}
interface IGetContactList {
  pageNo?: number
  pageSize?: number
  accounts?: string[]
}
export function getContactList(params: IGetContactList) {
  return get<IUserType[]>('/user/list', params)
}
