import { sleep } from 'src/utils'
let chatId = 0
export function createChat(): IChat {
  chatId++
  return {
    isTop: YES_NO.NO,
    chatId: '' + chatId,
    name: 'tangwenping',
    type: CHAT_TYPE.P2P,
  }
}
const list: IChat[] = []
async function ttt() {
  if (chatId > 5000) {
    console.log('TANG===END')
    return
  }
  const chat = createChat()
  list.push(chat)
  ttt()
}
async function add() {
  if (!list.length) return
  const s = list.splice(0, 50)
  window.$dispatch({ type: 'addChats', payload: s })
  await sleep(10)
  add()
}
export function addChatTestData() {
  console.log('TANG===START')
  ttt()
  console.log('TANG===', list.length)
  add()
}
