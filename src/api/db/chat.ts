export function addChats(list: IChatType[]) {
  console.log('addChats', list)
}
export function removeChats(chatIds: IChatType['chatId']) {
  console.log('removeChats', chatIds)
}
export function updateChats(list: IChatType[]) {
  console.log('updateChats', list)
}
export function getChats(chatIds: IChatType['chatId']) {
  console.log('getChats', chatIds)
}
export function loadChats() {
  return []
}