import { IChatId } from 'src/typings/chat'

export function isCurrentChat(chatId: IChatId) {
  return window.$state.chat.currentChatId === chatId
}
export function getCurrentInfo() {
  const currentChatId = window.$state.chat.currentChatId
  return window.$state.chat.map[currentChatId]
}
type IChatTemp = Partial<IChatType> & Required<Pick<IChatType, 'chatId' | 'type'>>
export function getChatTemp(opt: IChatTemp): IChatType {
  return {
    ...opt,
    isTop: 0,
  }
}
