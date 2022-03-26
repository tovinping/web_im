import { IChatId } from 'src/typings/chat'
type IMsgState = {
  map: Record<IChatId, IMsgType[] | undefined>
}
type IUpdateMsg = Partial<IMsgType> & Required<Pick<IMsgType, 'msgId'>>
type IAddMsgs = Record<IChatId, IMsgType[]>
type IRemoveMsgs = Record<IChatId, IUpdateMsg[]>
type IUpdateMsgs = Record<IChatId, IUpdateMsg[]>
type IMsgActions =
  | { type: 'addMsgs'; payload: IAddMsgs[] }
  | { type: 'removeMsgs'; payload: IRemoveMsgs[] }
  | { type: 'updateMsgs'; payload: IUpdateMsgs[] }

const initialState: IMsgState = {
  map: {},
}
export default function reducer(state = initialState, actions: IMsgActions): IMsgState {
  const { type, payload } = actions
  switch (type) {
    case 'addMsgs': {
      const map = { ...state.map }
      payload.forEach(item => {
        const [[groupId, msgs]] = Object.entries(item)
        const oldMsgs = map[groupId] || []
        map[groupId] = [...oldMsgs, ...msgs]
      })
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
