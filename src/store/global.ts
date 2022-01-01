import { IGlobalState, IGlobalActions } from 'src/interface'
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
    case 'updateMyInfo':
      return { ...state, myInfo: actions.payload }
    default:
      return state
  }
}
