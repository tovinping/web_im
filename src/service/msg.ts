import { dbApi, serverApi, storeApi } from 'src/api'
import { CHAT_TYPE, MSG_STATE } from 'src/constant'
import { getMsgTemplate } from 'src/helper'
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
  chatType: CHAT_TYPE
  chatId: string
  timestamp: number
}
export async function loadHistory(params: ILoadHistory) {
  // load from db
  // load from server
  const historyRes = await serverApi.loadHistory(params)
  logger.info('load history res=', historyRes.body?.length)
  if (historyRes.body) {
    const reversMsgs = historyRes.body.reverse()
    storeApi.prePendMsgs({ chatId: params.chatId, msgs: reversMsgs })
  }
}

export function handleReceiveMsg(data: IMsgType) {
  console.log('handleReceiveMsg', data)
  const chatId = data.chatId
  addMsgs({ chatId, msgs: [data] })
}
