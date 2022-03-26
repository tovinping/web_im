import { post } from 'src/utils/fetch'
interface ICreateGroupReq {
  groupName: string,
  memberList: string[]
  owner: string;
}
export function createGroup(params: ICreateGroupReq) {
  return post<IGroupType>('/group/add', params)
}
export function getGroupList(groupIds: string[]) {
  return post<IGroupType[]>('/groupList/list', {groupIds})
}
export function updateNotice(groupId: string, notice: string) {
  return post('/group/notice', {groupId, notice})
}