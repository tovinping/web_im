import { CHAT_TYPE, MSG_TYPE, MSG_STATE } from 'src/constant'
export interface IBaseMsgType {
  msgId: string
  // 创建者帐号
  account: string
  /**群聊为群ID单聊为对方帐号 */
  chatId: string
  /**0单聊1群聊 */
  chatType: CHAT_TYPE
  /**发送者名称**/
  name: string
  content: string
  /**消息类型 */
  type: MSG_TYPE
  /**发送时间 */
  timestamp: number
}

export default interface IMsgType extends IBaseMsgType {
  state: MSG_STATE
  /**发送者帐号 */
  clientId?: string
}
