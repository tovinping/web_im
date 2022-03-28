import clientSocket from './clientSocket'
import { getRandomStr } from './'
import { MSG_STATE } from 'src/constant'

type ISendType = Pick<IMsgType, 'chatId' | 'content' | 'chatType'>
export function createMsgTemplate(data: ISendType): IMsgType {
  const senderId = window.$state.global.account
  return {
    ...data,
    msgId: getRandomStr(),
    timestamp: Date.now(),
    type: 0,
    state: MSG_STATE.SENDING,
    senderId,
  }
}

export async function sendTextMsg({ chatId, chatType, content }: Required<ISendType>) {
  const msgTemp = createMsgTemplate({ chatId, chatType, content })
  window.$dispatch({ type: 'addMsgs', payload: [{ [chatId]: [msgTemp] }] })
  const { isOk, msg } = await clientSocket.sendMsg(msgTemp)
  if (!isOk) {
    console.log('sendTextMsg', msg)
  }
  const lastMsg: IMsgType = { ...msgTemp, state: isOk ? MSG_STATE.NORMAL : MSG_STATE.ERROR }
  window.$dispatch({ type: 'updateMsgs', payload: [{ [chatId]: [lastMsg] }] })
}

export function handleReceiveMsg(data: IMsgType) {
  console.log('handleReceiveMsg', data)
  const chatId = getCovIdByMsg(data)
  if (data?.senderId) {
    window.$dispatch({ type: 'addMsgs', payload: [{ [chatId]: [data] }] })
  }
  if (!chatId) return
  if (data.chatId) {
    // checkAndCreateChat({ chatId, type: CHAT_TYPE.GROUP, create: true })
  } else {
    // checkAndCreateChat({ chatId, type: CHAT_TYPE.P2P, create: true })
  }
}

export function getCovIdByMsg(data: IMsgType) {
  const myId = window.$state.global.account
  return data.chatType === '1' ? data.chatId : data.chatId === myId ? data.senderId : data.chatId
}
