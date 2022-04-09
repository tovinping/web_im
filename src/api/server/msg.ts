import { CHAT_TYPE } from 'src/constant'
import { get } from '../../utils/fetch'
interface ILoadHistory {
  chatId: string
  chatType: CHAT_TYPE
  timestamp?: number
}
export function loadHistory(params: ILoadHistory) {
  return get<IMsgType[]>('/msg/history', params)
}
