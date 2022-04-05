import { serverApi, storeApi } from 'src/api'
import { CHAT_TYPE, MSG_STATE } from 'src/constant'
import { getMsgTemplate } from 'src/helper'
import clientSocket from 'src/utils/clientSocket'
import getLogger from 'src/utils/logger'
const logger = getLogger('service_msg')
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
  timestamp: number
}
export async function loadHistory(params: ILoadHistory) {
  // load from db
  // load from server
  const historyRes = await serverApi.loadHistory(params)
  logger.info('load history res=', historyRes)
  if (historyRes.body) {
    const reversMsgs = historyRes.body.reverse()
    storeApi.prePendMsgs({ chatId: params.chatId, msgs: reversMsgs })
  }
}