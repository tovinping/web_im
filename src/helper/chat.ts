import { IChatId } from "src/typings/chat";

export function isCurrentChat(chatId: IChatId) {
  return window.$state.chat.currentChatId === chatId
}
export function getCurrentInfo(chatId: IChatId) {
  return window.$state.chat.map[chatId]
}