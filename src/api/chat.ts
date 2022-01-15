import { get, post } from '../utils/fetch'
import { IStoreChat } from '../interface'
export function getChats(account: string) {
  return get<IStoreChat[]>('/chat', { account })
}
export function createChat(owner: string, chatId: string, type: IStoreChat['type']) {
  return post<IStoreChat>('/chat/add', { chatId, type, owner })
}
