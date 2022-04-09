import { dbApi, serverApi, storeApi } from 'src/api'
import { CHAT_HISTORY_STATUS, CHAT_TYPE, HISTORY_PAGE_SIZE, MSG_STATE } from 'src/constant'
import { getChatInfoByChatId, getMsgTemplate } from 'src/helper'
import clientSocket from 'src/utils/webSocket'
import getLogger from 'src/utils/logger'
const logger = getLogger('service_msg')
interface IAddMsgs {
  chatId: string
  msgs: IMsgType[]
}
export async function addMsgs(params: IAddMsgs) {
  logger.info('addMsgs chatId=', params.chatId, 'len=', params.msgs.length)
  storeApi.addMsgs(params)
  dbApi.addMsgs(params.msgs)
}
export async function removeMsgs(params: IMsgType[]) {
  logger.info('removeMsgs len=', params.length)
}
interface ISendType {
  chatId: string
  chatType: CHAT_TYPE
  content: string
}
export async function sendTextMsg({ chatId, chatType, content }: Required<ISendType>) {
  const msgTemp = getMsgTemplate({ chatId, chatType, content })
  storeApi.addMsgs({ chatId, msgs: [msgTemp] })
  logger.info('send text msg before chatId=', msgTemp.chatId, 'clientMsgId=', msgTemp.clientId)
  const { isOk, tips, msg } = await clientSocket.sendMsg(msgTemp)
  logger.info(
    'send text msg after tips=',
    tips,
    'chatId=',
    msgTemp.chatId,
    'clientMsgId=',
    msg.clientId,
    'msgId=',
    msg.msgId
  )
  const lastMsg: IMsgType = { ...msgTemp, state: isOk ? MSG_STATE.NORMAL : MSG_STATE.ERROR }
  window.$dispatch({ type: 'updateMsgs', payload: [{ [chatId]: [lastMsg] }] })
}
interface ILoadHistory {
  chatId: string
  chatType: CHAT_TYPE
  timestamp?: number
}
export async function loadHistory({ chatId, chatType, timestamp }: ILoadHistory) {
  const chatInfo = getChatInfoByChatId(chatId)
  if (!chatInfo) return
  storeApi.updateChats([{ ...chatInfo!, historyStatus: CHAT_HISTORY_STATUS.LOADING }])
  // load from db
  // load from server
  const { code, body } = await serverApi.loadHistory({ chatId, chatType, timestamp })
  logger.info('load history res=', body?.length)
  if (!body || code !== 0) return
  const reversMsgs = body.reverse()
  storeApi.prePendMsgs({ chatId: chatId, msgs: reversMsgs })
  // 计算是否还有更多历史消息
  const historyStatus = body.length < HISTORY_PAGE_SIZE ? CHAT_HISTORY_STATUS.NONE : CHAT_HISTORY_STATUS.NORMAL
  storeApi.updateChats([{ ...chatInfo!, historyStatus }])
}
export function loadMoreHistory(chatId: string) {
  const chatInfo = getChatInfoByChatId(chatId)
  if (!chatInfo) return
  const msgList = storeApi.getState().msg.map[chatId]
  const timestamp = msgList?.at(0)?.timestamp || 0
  loadHistory({ chatId, timestamp, chatType: chatInfo.type })
}

export function handleReceiveMsg(data: IMsgType) {
  console.log('handleReceiveMsg', data)
  const chatId = data.chatId
  addMsgs({ chatId, msgs: [data] })
}
