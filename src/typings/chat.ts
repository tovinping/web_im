import { CHAT_TYPE, TOP_STATE } from 'src/constant';
import MsgType from './message'

export default interface IChatInfo {
  chatId: string
  /**0单聊1群聊 */
  type: CHAT_TYPE
  lastMsg?: MsgType
  name?:string
  /**0普通1置顶 */
  topState: TOP_STATE
}