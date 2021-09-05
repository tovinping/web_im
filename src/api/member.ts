import { get, post } from '../utils/fetch'
import { IMemberInfo } from '../interface'
export function getMemberList(groupId: string) {
  return get<IMemberInfo[]>('/groupMember/byGroupId', {groupId})
}
interface IUpdateAdmin {
  groupId: string
  account: string
  type: IMemberInfo['type']
}
export function updateAdmin(params: IUpdateAdmin) {
  return post<IMemberInfo[]>('/groupMember/admin', params)
}
export function addMember(accounts: string[], groupId: string){
  return post('/groupMember/add', {groupId, accounts})
}
export function removeMember(accounts: string[], groupId: string) {
  return post('/groupMember/remove', {groupId, accounts})
}