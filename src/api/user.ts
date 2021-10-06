import { get } from '../utils/fetch'
interface IGetContactList {
  pageNo: number
  pageSize: number
}
export function getContactList(params: IGetContactList) {
  return get<IUserType[]>('/user/list', params)
}
