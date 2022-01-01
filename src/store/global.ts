import { IGlobalState, IGlobalActions } from 'src/interface'
const initialState: IGlobalState = {
  isLogin: true,
  account: 'test1',
  windowSize: 'normalSize',
  windowVisible: 'show',
  contactSelect: {
    visible: false,
  }
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
