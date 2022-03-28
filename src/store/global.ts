interface IGlobalState {
  isLogin: boolean
  account: string
  windowSize: 'maxSize' | 'minSize' | 'normalSize'
  windowVisible: 'hide' | 'show'
  creatChatVisible: boolean
}
type IGlobalActions =
  | { type: 'updateGlobal'; payload: Partial<IGlobalState> }
  | { type: 'updateLogin'; payload: IGlobalState['isLogin'] }
  | { type: 'updateAccount'; payload: IGlobalState['account'] }
  | { type: 'setCreateChatVisible'; payload: IGlobalState['creatChatVisible'] }

const initialState: IGlobalState = {
  isLogin: false,
  account: '',
  windowSize: 'normalSize',
  windowVisible: 'show',
  creatChatVisible: false,
}
export default function reducer(state = initialState, actions: IGlobalActions): IGlobalState {
  switch (actions.type) {
    case 'updateGlobal':
      return { ...state, ...actions.payload }
    case 'updateLogin':
      return { ...state, isLogin: actions.payload }
    case 'updateAccount':
      return { ...state, account: actions.payload }
    case 'setCreateChatVisible':
      return { ...state, creatChatVisible: actions.payload }
    default:
      return state
  }
}
