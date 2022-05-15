import { storeApi } from 'src/api'

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
type IChatTemp = Partial<IChat> & Required<Pick<IChat, 'chatId' | 'type'>>
export function getChatTemp(opt: IChatTemp): IChat {
  return {
    ...opt,
    isTop: 0,
  }
}
