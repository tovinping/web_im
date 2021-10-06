import { createChat, getChats } from "src/api"
import { ICreateType, IChatExt } from "src/interface"


export async function getChatChange() {
  const account = window.$state.global.account;
  const {data, code, msg} = await getChats(account);
  console.log('getChat=', code, msg)
  if (data) {
    window.$dispatch({type: 'setChatList', payload: data})
  }
}
// 创建会话
export async function handCreateChat({chatId, type}: Pick<ICreateType, 'chatId' | 'type'>) {
  const owner = window.$state.global.account
  return createChat(owner, chatId, type)
}
// 判断是否有会话并创建
type ICheckProps = Pick<IChatType, 'chatId' | 'type'> & {
  create?: boolean;
}
export async function checkChat(params: ICheckProps) {
  const ChatInfo = window.$state.chat.list.find(chat => chat.chatId === params.chatId)
  if (!ChatInfo && params.create) {
    const {data, code} = await handCreateChat({chatId: params.chatId, type: params.type})
    if (code === 0) {
      window.$dispatch({type: 'addChat', payload: data!})
    }
    return data
  }
  return ChatInfo
}

// 打开或者创建会话
export async function openOrCreateChat(chatId: string, type: IChatExt['type']) {
  const ChatInfo = await checkChat({chatId, type, create: true})
  if (ChatInfo) {
    window.$dispatch({type: 'setCurrentChat', payload: ChatInfo})
    return true
  }
  return false
}