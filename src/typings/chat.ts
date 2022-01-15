import { CHAT_TYPE, YES_NO } from 'src/constant';
import MsgType from './message'

export default interface IChatInfo {
  chatId: string
  /**0单聊1群聊 */
  type: CHAT_TYPE
  lastMsg?: MsgType
  name?:string
  /**0普通1置顶 */
  isTop: YES_NO
}