import { ILastMsgState, ILastMsgActions } from 'src/interface'
const initialState: ILastMsgState = {}
export default function reducer(state = initialState, actions: ILastMsgActions): ILastMsgState {
  switch (actions.type) {
    case 'setLastMsg':
      return { ...state, ...actions.payload }
    case 'updateLastMsg': {
      const chatId = actions.payload.chatId
      const stateMsg = state[chatId]
      if (!stateMsg) return state
      return { ...state, [chatId]: { ...stateMsg, ...actions.payload } }
    }
    default:
      return state
  }
}
