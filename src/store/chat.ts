import { IChatState, IChatActions, IStoreChat } from 'src/interface'
const initialState: IChatState = {
  list: [],
  current: undefined,
}
function getCurrent(data: IStoreChat) {
  return initialState.current?.chatId === data.chatId ? data : initialState.current
}
export default function reducer(
  state = initialState,
  actions: IChatActions
): IChatState {
  switch (actions.type) {
    case 'setChatList':
      return { ...state, list: actions.payload }
    case 'removeChat':
      const rList = state.list.filter((item) => item.chatId !== actions.payload.chatId)
      return { ...state, list: rList, current: getCurrent(actions.payload) }
    case 'setCurrentChat':
      return { ...state, current: actions.payload }
    case 'updateChat':
      const uList = state.list.map((item) =>
        item.chatId === actions.payload.chatId ? actions.payload : item
      )
      return { ...state, list: uList, current: getCurrent(actions.payload) }
    case 'addChat':
      return {...state, list: state.list.concat(actions.payload)}
    default:
      return { ...state }
  }
}
