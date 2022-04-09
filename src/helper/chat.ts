import { storeApi } from 'src/api'
import { IChatId } from 'src/typings/chat'

export function isCurrentChat(chatId: IChatId) {
  return storeApi.getState().chat.currentChatId === chatId
}
export function getCurrentChatInfo() {
  const storeDate = storeApi.getState()
  const currentChatId = storeDate.chat.currentChatId
  return storeDate.chat.map[currentChatId]
}
export function getChatInfoByChatId(chatId: string) {
  return storeApi.getState().chat.map[chatId]
}
type IChatTemp = Partial<IChatType> & Required<Pick<IChatType, 'chatId' | 'type'>>
export function getChatTemp(opt: IChatTemp): IChatType {
  return {
    ...opt,
    isTop: 0,
  }
}
