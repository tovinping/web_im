const dbChatApi = {
  addChats(list: IChatType[]) {
    console.log('addChats', list)
  },
  removeChats(chatIds: IChatType['chatId']) {
    console.log('removeChats', chatIds)
  },
  updateChats(list: IChatType[]) {
    console.log('updateChats', list)
  },
  getChats(chatIds: IChatType['chatId']) {
    console.log('getChats', chatIds)
  },
  loadChats() {
    return []
  },
}
export default dbChatApi
