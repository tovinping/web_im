import { createChat, getChats } from 'src/api/server'
import { CHAT_TYPE } from 'src/constant'
import { openContactSelect } from '.'
const logger = window.getLogger('utils/chat')

export async function loadChatList() {
  const account = window.$state.global.account
  const { body } = await getChats(account)
  if (body) {
    const users: IUserType[] = []
    
    body.forEach(item => {
      if (item.type === CHAT_TYPE.P2P) {
        users.push({account: item.chatId, name: item.name})
      }
    })
    window.$dispatch({type: 'addUsers', payload: users})
  }
}
// 创建会话
export async function handCreateChat({ chatId, type }: Pick<IChatType, 'chatId' | 'type'>) {
  const owner = window.$state.global.account
  return createChat(owner, chatId, type)
}
// 判断是否有会话并创建
type ICheckProps = Pick<IChatType, 'chatId' | 'type'> & {
  create?: boolean
}
export async function checkAndCreateChat(params: ICheckProps) {
  const ChatInfo = window.$state.chat.list.find(chatId => chatId === params.chatId)
  if (!ChatInfo && params.create) {
    const { body, code } = await handCreateChat({ chatId: params.chatId, type: params.type })
    if (code === 0 && body) {
      window.$dispatch({ type: 'addChats', payload: [body] })
    }
    return body
  }
  return ChatInfo
}

// 打开或者创建会话
export async function openOrCreateChat(chatId: string, type: CHAT_TYPE) {
  const ChatInfo = await checkAndCreateChat({ chatId, type, create: true })
  if (ChatInfo) {
    window.$dispatch({ type: 'updateCurrentChat', payload: chatId })
    return true
  }
  return false
}
export function handClickAddChat() {
  logger.info('handClickAddChat')
  openContactSelect().then(userList => {
    logger.info('handClickAddChat result', userList)
    if (userList.length === 1) {
      openOrCreateChat(userList[0].account, CHAT_TYPE.P2P)
    } else if (userList.length > 1) {
    }
  })
}
