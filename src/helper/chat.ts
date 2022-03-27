import { IChatId } from 'src/typings/chat'

export function isCurrentChat(chatId: IChatId) {
  return window.$state.chat.currentChatId === chatId
}
export function getCurrentInfo() {
  const currentChatId = window.$state.chat.currentChatId
  return window.$state.chat.map[currentChatId]
}
