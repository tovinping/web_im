type IMsgState = {
  map: Record<string, IMsg[] | undefined>
}
type IUpdateMsg = Partial<IMsg> & Required<Pick<IMsg, 'msgId'>>
type IAddMsgs = { chatId: string; msgs: IMsg[] }
type IRemoveMsgs = Record<string, IUpdateMsg[]>
type IUpdateMsgs = Record<string, IUpdateMsg[]>
type IMsgActions =
  | { type: 'addMsgs'; payload: IAddMsgs }
  | { type: 'removeMsgs'; payload: IRemoveMsgs[] }
  | { type: 'updateMsgs'; payload: IUpdateMsgs[] }
  | { type: 'prePendMsgs'; payload: IAddMsgs }

const initialState: IMsgState = {
  map: {},
}
export default function reducer(state = initialState, actions: IMsgActions): IMsgState {
  const { type, payload } = actions
  switch (type) {
    case 'addMsgs': {
      const map = { ...state.map }
      const { chatId, msgs } = payload
      const oldMsgs = map[chatId] || []
      map[chatId] = [...oldMsgs, ...msgs]
      return { ...state, map }
    }
    case 'prePendMsgs': {
      const map = { ...state.map }
      const { chatId, msgs } = payload
      const oldMsgs = map[chatId] || []
      map[chatId] = [...msgs, ...oldMsgs]
      return { ...state, map }
    }
    case 'removeMsgs': {
      const map = { ...state.map }
      payload.forEach(item => {
        const [[groupId, members]] = Object.entries(item)
        const oldMembers = map[groupId] || []
        const removedMembers = oldMembers.filter(item => members.find(r => r.msgId === item.msgId))
        map[groupId] = removedMembers
      })
      return { ...state, map }
    }
    case 'updateMsgs': {
      const map = { ...state.map }
      payload.forEach(item => {
        const [[groupId, members]] = Object.entries(item)
        const oldMembers = map[groupId] || []
        const updatedMembers = oldMembers.map(item => {
          const newInfo = members.find(m => m.msgId === item.msgId)
          return newInfo ? { ...item, ...newInfo } : item
        })
        map[groupId] = updatedMembers
      })
      return { ...state, map }
    }
    default:
      return state
  }
}
