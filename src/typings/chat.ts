import { CHAT_TYPE, YES_NO, CHAT_HISTORY_STATUS } from 'src/constant'
import MsgType from './message'
interface IBaseChatType {
  chatId: string
  /**0单聊1群聊 */
  type: CHAT_TYPE
  lastMsg?: MsgType
  /**会话名称-群名称或用户名称 */
  name?: string
  /**0普通1置顶 */
  isTop: YES_NO
}

export default interface ILocalChatType extends IBaseChatType {
  historyStatus?: CHAT_HISTORY_STATUS
  /**未读数量 */
  unReadCount?: number
}
export type IChatId = IChatType['chatId']
