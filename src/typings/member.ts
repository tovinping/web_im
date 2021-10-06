import { MEMBER_TYPE } from "src/constant";

export default interface MemberType {
  account: string
  groupId: string
  type: MEMBER_TYPE;
  nickName?: string
}