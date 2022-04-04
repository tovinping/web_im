export function handleReceiveMsg(data: IMsgType) {
  console.log('handleReceiveMsg', data)
  const chatId = getCovIdByMsg(data)
  if (data?.account) {
    window.$dispatch({ type: 'addMsgs', payload: [{ [chatId]: [data] }] })
  }
  if (!chatId) return
  if (data.chatId) {
    // checkAndCreateChat({ chatId, type: CHAT_TYPE.GROUP, create: true })
  } else {
    // checkAndCreateChat({ chatId, type: CHAT_TYPE.P2P, create: true })
  }
}

export function getCovIdByMsg(data: IMsgType) {
  const myId = window.$state.global.account
  return data.chatType === '1' ? data.chatId : data.chatId === myId ? data.account : data.chatId
}
