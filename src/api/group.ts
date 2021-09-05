import { post } from '../utils/fetch'
import { IGroupInfo } from '../interface'
interface ICreateGroupReq {
  groupName: string,
  memberList: string[]
  owner: string;
}
export function createGroup(params: ICreateGroupReq) {
  return post<IGroupInfo>('/group/add', params)
}
export function getGroupList(groupIds: string[]) {
  return post<IGroupInfo[]>('/groupList/list', {groupIds})
}
export function updateNotice(groupId: string, notice: string) {
  return post('/group/notice', {groupId, notice})
}