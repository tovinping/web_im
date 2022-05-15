enum GROUP_STATE {
  NORMAL = '0',
  INVALID = '1',
}
interface IGroup {
  _id: number
  groupId: string
  name: string
  state: GROUP_STATE
  avatar: string
  notice: string
  owner: string
}
type IGroupId = IGroup['groupId']
