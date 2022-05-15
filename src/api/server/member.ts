import { get, post } from 'src/utils/fetch'
export function getMemberList(groupId: string) {
  return get<IMember[]>('/groupMember/byGroupId', { groupId })
}
interface IUpdateAdmin {
  groupId: string
  account: string
  type: IMember['type']
}
export function updateAdmin(params: IUpdateAdmin) {
  return post<IMember[]>('/groupMember/admin', params)
}
export function addMember(accounts: string[], groupId: string) {
  return post('/groupMember/add', { groupId, accounts })
}
export function removeMember(accounts: string[], groupId: string) {
  return post('/groupMember/remove', { groupId, accounts })
}
