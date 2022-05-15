export function addChat(data: IChat) {
  console.log('addChat', data)
}
export function addChats(list: IChat[]) {
  console.log('addChats', list)
}
export function removeChats(chatIds: IChat['chatId']) {
  console.log('removeChats', chatIds)
}
export function updateChats(list: IChat[]) {
  console.log('updateChats', list)
}
export function getChats(chatIds: IChat['chatId']) {
  console.log('getChats', chatIds)
}
