import { get, post } from '../../utils/fetch'
export function getChats(account: string) {
  return get<IChat[]>('/chat', { account })
}
export function addChat(data: IChat) {
  return post('/chat', data)
}
