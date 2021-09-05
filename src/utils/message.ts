import { IMsg } from 'src/interface'
import clientSocket from './clientSocket'
import { getRandomStr, checkConversation } from './'

type ISendType = Pick<IMsg, 'receiveId' | 'content' | 'chatType'>
export function createMsgTemplate(data: ISendType): IMsg {
  const senderId = window.$state.global.account
  return {
    id: getRandomStr(),
    chatType: data.chatType,
    timestamp: Date.now(),
    type: 0,
    state: 0,
    receiveId: data.receiveId,
    senderId,
    content: data.content
  }
}
/**
 * 统一发送消息
 * @param data 
 */
function sendMsg(data: any) {
  return clientSocket.sendTextMsg(data)
}

export function sendTextMsg({receiveId, content, chatType}: Required<ISendType>) {
  const data = createMsgTemplate({receiveId, chatType, content })
  sendMsg(data);
  window.$dispatch({type: 'appendMsg', payload: data})
}

export function handleReceiveMsg(data: IMsg) {
  console.log('handleReceiveMsg', data)
  if (data?.senderId) {
    window.$dispatch({ type: 'appendMsg', payload: data })
  }
  const conversationId = getCovIdByMsg(data)
  if (!conversationId) return;
  // 判断是否需要创建会话
  if (data.groupId) {
    checkConversation({conversationId, type: '1', create: true})
  } else {
    checkConversation({conversationId, type: '0', create: true})
  }
}

export function getCovIdByMsg(data: IMsg) {
  const myId = window.$state.global.account
  return data.chatType === '1' ? data.groupId : data.receiveId === myId ? data.senderId : data.receiveId
}