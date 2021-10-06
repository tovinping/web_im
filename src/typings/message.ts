import { CHAT_TYPE, MSG_TYPE, MSG_STATE } from "src/constant";

export default interface IMsgType {
  /**服务器生产的消息ID */
  id: string
  chatType: CHAT_TYPE
  /**会话ID-单人:个人帐号;群聊:群Id*/
  groupId?: string
  type: MSG_TYPE
  timestamp: number
  state: MSG_STATE
  /**发送者帐号 */
  senderId: string
  /**接收者帐号 */
  receiveId?: string
  /**主动发送时产生的消息ID */
  clientId?: string
  /**消息内容*/
  content: string;
}
