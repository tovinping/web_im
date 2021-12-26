import { get, post } from '../utils/fetch'
import { ILoginReq } from '../interface'

interface IGetContactList {
  pageNo: number
  pageSize: number
}
export function getContactList(params: IGetContactList) {
  return get<IUserType[]>('/user/list', params)
}
export async function login(data: ILoginReq) {
  return post<string>('/user/login', data)
}

export async function autoLogin() {
  return post<string>('/user/autoLogin')
}