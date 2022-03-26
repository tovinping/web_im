import { CHAT_TYPE } from 'src/constant'
import { get, post } from '../../utils/fetch'
export function getChats(account: string) {
  return get<IChatType[]>('/chat', { account })
}
export function createChat(owner: string, chatId: string, type: CHAT_TYPE) {
  return post<IChatType>('/chat/add', { chatId, type, owner })
}
