import { get } from '../utils/fetch'
import { IUser } from '../interface'
interface IGetContactList {
  pageNo: number
  pageSize: number
}
export function getContactList(params: IGetContactList) {
  return get<IUser[]>('/user/list', params)
}
