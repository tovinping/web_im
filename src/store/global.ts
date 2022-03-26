interface IGlobalState {
  isLogin: boolean
  account: string
  windowSize: 'maxSize' | 'minSize' | 'normalSize'
  windowVisible: 'hide' | 'show'
  contactSelect: {
    visible: boolean
    selected?: string[]
    callback?: Function
  }
}
type IGlobalActions =
  | { type: 'updateGlobal'; payload: Partial<IGlobalState> }
  | { type: 'updateLogin'; payload: IGlobalState['isLogin'] }
  | { type: 'updateAccount'; payload: IGlobalState['account'] }
  | { type: 'updateContactSelect'; payload: IGlobalState['contactSelect'] }

const initialState: IGlobalState = {
  isLogin: false,
  account: '',
  windowSize: 'normalSize',
  windowVisible: 'show',
  contactSelect: {
    visible: false,
  },
}
export default function reducer(state = initialState, actions: IGlobalActions): IGlobalState {
  switch (actions.type) {
    case 'updateGlobal':
      return { ...state, ...actions.payload }
    case 'updateLogin':
      return { ...state, isLogin: actions.payload }
    case 'updateAccount':
      return { ...state, account: actions.payload }
    case 'updateContactSelect':
      return { ...state, contactSelect: actions.payload }
    default:
      return state
  }
}
