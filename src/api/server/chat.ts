import { get } from '../../utils/fetch'
export function getChats(account: string) {
  return get<IChatType[]>('/chat', { account })
}
