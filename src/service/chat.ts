import { dbApi, storeApi, serverApi } from 'src/api'
import { getState } from 'src/api/store'
import { CHAT_TYPE } from 'src/constant'
import { getChatTemp } from 'src/helper/chat'
import { loadHistory } from './msg'
import { addUsers, loadUserInfos } from './user'
const logger = window.getLogger('service/Chat')
export function addChat(data: IChatType) {
  console.log('addChats')
  serverApi.addChat(data)
  dbApi.addChat(data)
  storeApi.addChat(data)
}
export function addChats(list: IChatType[]) {
  dbApi.addChats(list)
  storeApi.addChats(list)
}
export function removeChats() {
  console.log('removeChats')
}

export function createP2pChat(userInfo: IUserType) {
  logger.info('createP2pChat userAccount:', userInfo.account)
  const chatInfo = getChatTemp({ chatId: userInfo.account, type: CHAT_TYPE.P2P })
  addChat(chatInfo)
  addUsers([userInfo])
}

export function createGroupChat(groupId: string) {
  logger.info('createGroupChat groupId=', groupId)
}

export async function loadServerChats() {
  const account = getState().global.account
  const chatListRes = await serverApi.getChats(account)
  logger.info('loadChatList len=', chatListRes.body?.length)
  const chatMap = getState().chat.map
  const updateChats: IChatType[] = []
  if (chatListRes.body) {
    const accounts: string[] = []
    chatListRes.body.forEach(item => {
      const storeChat = chatMap[item.chatId]
      if (storeChat) {
        updateChats.push({ ...storeChat, ...item })
      } else {
        updateChats.push(item)
      }
      if (item.type === CHAT_TYPE.P2P) {
        accounts.push(item.chatId)
      }
    })
    storeApi.addChats(updateChats)
    const userList = await serverApi.getContactList({ accounts })
    if (userList.body) {
      storeApi.addUsers(userList.body)
    }
  }
}
export async function handChatClick(data?: IChatType) {
  if (!data) return
  storeApi.updateCurrentChat(data.chatId)
  loadHistory({ chatId: data.chatId, timestamp: 999999999999999 })
}
type ICreateOrUpdate = Pick<IChatType, 'chatId' | 'type'> & Partial<IChatType>
export async function createOrUpdateChat(params: ICreateOrUpdate) {
  const { type, chatId } = params
  logger.info('createOrUpdateChat chatId=', chatId, 'type=', type)
  if (type === CHAT_TYPE.P2P) {
    const chatInfo = getChatTemp({ chatId, type: CHAT_TYPE.P2P })
    addChat(chatInfo)
    loadUserInfos([chatId])
  } else if (type === CHAT_TYPE.GROUP) {
    logger.info('group')
  } else {
    logger.error('创建聊天失败')
  }
}
