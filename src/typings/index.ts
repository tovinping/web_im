import ChatType from './chat'
import MsgType from './message'
import UserType from './user'
import GroupType from './group'
import MemberType from './member'
import logger from '../utils/logger'
declare global {
  const COS: any;
  interface Window {
    NodeBridge: {
      closeWindow(): void
      miniSize(): void
      maxSize(): void
      normalSize(): void
    }
    getLogger: typeof logger
  }
  type IChatType = ChatType
  type IMsgType = MsgType
  type IUserType = UserType
  type IGroupType = GroupType
  type IMemberType = MemberType
}