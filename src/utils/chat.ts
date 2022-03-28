import { getChats } from 'src/api/server'
import { CHAT_TYPE } from 'src/constant'
const logger = window.getLogger('utils/chat')

export async function loadChatList() {
  logger.info('loadChatList')
  const account = window.$state.global.account
  const { body } = await getChats(account)
  if (body) {
    const users: IUserType[] = []

    body.forEach(item => {
      if (item.type === CHAT_TYPE.P2P) {
        users.push({ account: item.chatId, name: item.name })
      }
    })
    window.$dispatch({ type: 'addUsers', payload: users })
  }
}
