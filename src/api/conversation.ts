import { get, post } from '../utils/fetch'
import { IConversation } from '../interface'
export function getConversations(account: string) {
  return get<IConversation[]>('/conversation/list', { account })
}
export function createConversation(owner: string, conversationId: string, type: IConversation['type']) {
  return post<IConversation>('/conversation/add', { conversationId, type, owner })
}
