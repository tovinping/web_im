interface IChatState {
  list: IChatId[]
  map: Record<IChatId, IChat | undefined>
  currentChatId: IChatId
}
export type IUpdateChat = Partial<IChat> & Required<Pick<IChat, 'chatId'>>
type IChatActions =
  | { type: 'addChats'; payload: IChat[] }
  | { type: 'removeChats'; payload: IChat['chatId'][] }
  | { type: 'updateChats'; payload: IUpdateChat[] }
  | { type: 'updateCurrentChat'; payload: IChat['chatId'] }

const initialState: IChatState = {
  list: [],
  map: {},
  currentChatId: '',
}
export default function reducer(state = initialState, actions: IChatActions): IChatState {
  const { type, payload } = actions
  switch (type) {
    case 'addChats': {
      const chatSet = new Set(state.list)
      const map = { ...state.map }
      payload.forEach(item => {
        chatSet.add(item.chatId)
        const old = map[item.chatId] || {}
        map[item.chatId] = { ...old, ...item }
      })
      return { ...state, list: [...chatSet], map }
    }
    case 'removeChats': {
      const isRemoveCurrent = payload.includes(state.currentChatId)
      let currentChatId = isRemoveCurrent ? '' : state.currentChatId
      const map = { ...state.map }
      payload.forEach(chatId => delete map[chatId])
      const list = state.list.filter(chatId => {
        return !payload.includes(chatId)
      })
      return { ...state, list, currentChatId, map }
    }
    case 'updateChats': {
      const map = { ...state.map }
      payload.forEach(item => {
        const chatInfo = map[item.chatId]
        if (chatInfo) {
          map[item.chatId] = { ...chatInfo, ...item }
        }
      })
      return { ...state, map }
    }
    case 'updateCurrentChat': {
      return { ...state, currentChatId: payload }
    }
    default: {
      return { ...state }
    }
  }
}
