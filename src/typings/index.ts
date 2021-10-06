import ChatType from './chat'
import MsgType from './message'
import UserType from './user'
import GroupType from './group'
import MemberType from './member'

declare global {
  interface Window {
    NodeBridge: {
      closeWindow(): void
      miniSize(): void
      maxSize(): void
      normalSize(): void
    }
  }
  type IChatType = ChatType
  type IMsgType = MsgType
  type IUserType = UserType
  type IGroupType = GroupType
  type IMemberType = MemberType
}