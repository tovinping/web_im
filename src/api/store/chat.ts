import { IUpdateChat } from 'src/store/chat'

export function addChat(data: IChat) {
  window.$dispatch({ type: 'addChats', payload: [data] })
}
export function addChats(payload: IChat[]) {
  window.$dispatch({ type: 'addChats', payload })
}
export function updateChats(payload: IUpdateChat[]) {
  window.$dispatch({ type: 'updateChats', payload })
}
export function updateCurrentChat(payload: string) {
  window.$dispatch({ type: 'updateCurrentChat', payload })
}
