enum CHAT_TYPE {
  P2P = '0',
  GROUP = '1',
}
enum CHAT_HISTORY_STATUS {
  NORMAL = '0',
  LOADING = '1',
  NONE = '2',
}

interface IBaseChat {
  chatId: string
  /**0单聊1群聊 */
  type: CHAT_TYPE
  lastMsg?: MsgType
  /**会话名称-群名称或用户名称 */
  name?: string
  /**0普通1置顶 */
  isTop: YES_NO
}

interface IChat extends IBaseChat {
  historyStatus?: CHAT_HISTORY_STATUS
  /**未读数量 */
  unReadCount?: number
  /**滚动高度 */
  scrollTop?: number
}
type IChatId = IChat['chatId']
