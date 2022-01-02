import { get, post, put } from '../utils/fetch'
import { ILoginReq } from '../interface'
interface ILoginSuccess {
  token: string
  refreshToken: string
}
export async function login(data: ILoginReq) {
  return post<ILoginSuccess>('/user/login', data)
}
export interface IRegister {
  account: string
  name: string
  password: string
  mail: string
}
export async function register(data: IRegister) {
  return post('/user/register', data)
}

export async function autoLogin(refreshToken: string) {
  return post<ILoginSuccess>('/user/autoLogin', { refreshToken })
}

export async function updateSign(sign: string) {
  const {code} = await put('/user/sign', {sign})
  if (code === 0) {
    const myAccount = window.$state.global.account
    window.$dispatch({type: 'updateUser', payload: {account: myAccount, sign}})
  }
}
export async function getUserInfo(account: string) {
  return get<IUserType>('/user/' + account)
}
export async function updateAvatar(avatarUrl: string) {
  return put('/user/avatar', {avatarUrl})
}
interface IGetContactList {
  pageNo?: number
  pageSize?: number
  accounts?: string[]
}
export function getContactList(params: IGetContactList) {
  return get<IUserType[]>('/user/list', params)
}