import dbChatApi from 'src/api/db/chat'
import storeChatApi from 'src/api/store/chat'
import { CHAT_TYPE } from 'src/constant'
import { getChatTemp } from 'src/helper/chat'
import { addUsers } from './user'
const logger = window.getLogger('service/Chat')
export function addChats(list: IChatType[]) {
  console.log('addChats')
  dbChatApi.addChats(list)
  storeChatApi.addChats(list)
}
export function removeChats() {
  console.log('removeChats')
}

export function createP2pChat(userInfo: IUserType) {
  logger.info('createP2pChat userAccount:', userInfo.account)
  const chatInfo = getChatTemp({ chatId: userInfo.account, type: CHAT_TYPE.P2P })
  addChats([chatInfo])
  addUsers([userInfo])
}
