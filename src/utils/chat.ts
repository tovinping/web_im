import { createChat, getChats } from 'src/api'
import { CHAT_TYPE } from 'src/constant'
import { ICreateType } from 'src/interface'
import { openContactSelect } from '.'
const logger = window.getLogger('utils/chat')

export async function getChatList() {
  const account = window.$state.global.account
  const { body } = await getChats(account)
  if (body) {
    const userMap: Record<string, IUserType> = {}
    body.forEach(item => {
      if (item.type === CHAT_TYPE.p2p) {
        userMap[item.chatId] = {account: item.chatId, name: item.name}
      }
    })
    window.$dispatch({type: 'setUser', payload: userMap})
    window.$dispatch({ type: 'setChatList', payload: body })
  }
}
// 创建会话
export async function handCreateChat({ chatId, type }: Pick<ICreateType, 'chatId' | 'type'>) {
  const owner = window.$state.global.account
  return createChat(owner, chatId, type)
}
// 判断是否有会话并创建
type ICheckProps = Pick<IChatType, 'chatId' | 'type'> & {
  create?: boolean
}
export async function checkAndCreateChat(params: ICheckProps) {
  const ChatInfo = window.$state.chat.list.find(chat => chat.chatId === params.chatId)
  if (!ChatInfo && params.create) {
    const { body, code } = await handCreateChat({ chatId: params.chatId, type: params.type })
    if (code === 0) {
      window.$dispatch({ type: 'addChat', payload: body! })
    }
    return body
  }
  return ChatInfo
}

// 打开或者创建会话
export async function openOrCreateChat(chatId: string, type: CHAT_TYPE) {
  const ChatInfo = await checkAndCreateChat({ chatId, type, create: true })
  if (ChatInfo) {
    window.$dispatch({ type: 'setCurrentChat', payload: ChatInfo })
    return true
  }
  return false
}
export function handClickAddChat() {
  logger.info('handClickAddChat')
  openContactSelect().then(userList => {
    logger.info('handClickAddChat result', userList)
    if (userList.length === 1) {
      openOrCreateChat(userList[0].account, CHAT_TYPE.p2p)
    } else if (userList.length > 1) {
    }
  })
}
