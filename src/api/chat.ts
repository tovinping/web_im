import { get, post } from '../utils/fetch'
import { IChatExt } from '../interface'
export function getChats(account: string) {
  return get<IChatExt[]>('/chat', { account })
}
export function createChat(owner: string, chatId: string, type: IChatExt['type']) {
  return post<IChatExt>('/chat/add', { chatId, type, owner })
}
