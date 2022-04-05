export function addChat(data: IChatType) {
  window.$dispatch({ type: 'addChats', payload: [data] })
}
export function addChats(payload: IChatType[]) {
  window.$dispatch({ type: 'addChats', payload })
}
export function updateChats(payload: IChatType[]) {
  window.$dispatch({ type: 'updateChats', payload })
}
export function updateCurrentChat(payload: string) {
  window.$dispatch({ type: 'updateCurrentChat', payload })
}
