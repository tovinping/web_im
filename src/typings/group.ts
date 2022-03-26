import { GROUP_STATE } from "src/constant";

export default interface IGroupType {
  _id: number
  groupId: string
  name: string
  state: GROUP_STATE
  avatar: string
  notice: string
  owner: string
}
export type IGroupId = IGroupType['groupId']