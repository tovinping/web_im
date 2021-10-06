import { GROUP_STATE } from "src/constant";

export default interface GroupType {
  _id: number
  groupId: string
  name: string
  state: GROUP_STATE
  avatar: string
  notice: string
  owner: string
}