import { get, post } from '../../utils/fetch'
export function getChats(account: string) {
  return get<IChatType[]>('/chat', { account })
}
export function addChat(data: IChatType) {
  return post('/chat', data)
}
