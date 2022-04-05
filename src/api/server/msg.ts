import { get } from '../../utils/fetch'
interface ILoadHistory {
  chatId: string
  timestamp: number
}
export function loadHistory(params: ILoadHistory) {
  return get<IMsgType[]>('/msg/history', params)
}
