enum MSG_TYPE {
  TEXT = '0',
  IMG = '1',
  IMG_TEXT = '2',
  VIDEO = '3',
  VOICE = '4',
  FILE = '5',
}
enum MSG_STATE {
  NORMAL = 0,
  SENDING = 1,
  WITHDRAW = 2,
  DELETE = 3,
  ERROR = 4,
}
interface IBaseMsg {
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

interface IMsg extends IBaseMsg {
  state: MSG_STATE
  /**本地ID */
  clientId?: string
  /**发送客户端**/
  deviceType: DEVICE_TYPE
}
