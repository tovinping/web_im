import { IMsg } from 'src/interface'
import clientSocket from './clientSocket'
import { getRandomStr, checkAndCreateChat } from './'
import { CHAT_TYPE, MSG_STATE } from 'src/constant'

type ISendType = Pick<IMsg, 'chatId' | 'content' | 'chatType'>
export function createMsgTemplate(data: ISendType): IMsg {
  const senderId = window.$state.global.account
  return {
    ...data,
    id: getRandomStr(),
    timestamp: Date.now(),
    type: 0,
    state: MSG_STATE.SENDING,
    senderId,
  }
}

export async function sendTextMsg({ chatId, chatType, content}: Required<ISendType>) {
  const msgTemp = createMsgTemplate({ chatId, chatType, content })
  window.$dispatch({ type: 'appendMsg', payload: msgTemp })
  window.$dispatch({ type: 'setLastMsg', payload: { [chatId]: msgTemp } })
  const { isOk, msg } = await clientSocket.sendMsg(msgTemp)
  if (!isOk) {
    console.log('sendTextMsg', msg)
  }
  const lastMsg: IMsgType = { ...msgTemp, state: isOk ? MSG_STATE.NORMAL : MSG_STATE.ERROR }
  window.$dispatch({ type: 'updateMsg', payload: lastMsg })
  window.$dispatch({ type: 'setLastMsg', payload: { [chatId]: lastMsg } })
}

export function handleReceiveMsg(data: IMsg) {
  console.log('handleReceiveMsg', data)
  if (data?.senderId) {
    window.$dispatch({ type: 'appendMsg', payload: data })
  }
  const chatId = getCovIdByMsg(data)
  if (!chatId) return
  if (data.chatId) {
    checkAndCreateChat({ chatId, type: CHAT_TYPE.group, create: true })
  } else {
    checkAndCreateChat({ chatId, type: CHAT_TYPE.p2p, create: true })
  }
}

export function getCovIdByMsg(data: IMsg) {
  const myId = window.$state.global.account
  return data.chatType === '1' ? data.chatId : data.chatId === myId ? data.senderId : data.chatId
}
