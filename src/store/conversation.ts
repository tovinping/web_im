import { IConversationState, IConversationActions, IConversation } from 'src/interface'
const initialState: IConversationState = {
  list: [],
  current: undefined,
}
function getCurrent(data: IConversation) {
  return initialState.current?.conversationId === data.conversationId ? data : initialState.current
}
export default function reducer(
  state = initialState,
  actions: IConversationActions
): IConversationState {
  switch (actions.type) {
    case 'setConversationList':
      return { ...state, list: actions.payload }
    case 'removeConversation':
      const rList = state.list.filter((item) => item.conversationId !== actions.payload.conversationId)
      return { ...state, list: rList, current: getCurrent(actions.payload) }
    case 'setCurrentConversation':
      return { ...state, current: actions.payload }
    case 'updateConversation':
      const uList = state.list.map((item) =>
        item.conversationId === actions.payload.conversationId ? actions.payload : item
      )
      return { ...state, list: uList, current: getCurrent(actions.payload) }
    case 'addConversation':
      return {...state, list: state.list.concat(actions.payload)}
    default:
      return { ...state }
  }
}
