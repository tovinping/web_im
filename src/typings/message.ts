import { CHAT_TYPE, MSG_TYPE, MSG_STATE, DEVICE_TYPE } from 'src/constant'
export interface IBaseMsgType {
  msgId: string
  // 发送者帐号
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
  /**本地ID */
  clientId?: string
  /**发送客户端**/
  deviceType: DEVICE_TYPE
}
