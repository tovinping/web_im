import { PartialShortcutKey } from 'src/typings'

export type ISendMsgShortcutKey = PartialShortcutKey<'control.enter' | 'enter'>
interface IGlobalState {
  isLogin: boolean
  account: string
  windowSize: 'maxSize' | 'minSize' | 'normalSize'
  windowVisible: 'hide' | 'show'
  creatChatVisible: boolean
  msgScrollBottom: number
  sendMsgShortcutKey: 'control.enter' | 'enter'
}
type IGlobalActions =
  | { type: 'updateGlobal'; payload: Partial<IGlobalState> }
  | { type: 'updateLogin'; payload: IGlobalState['isLogin'] }
  | { type: 'updateAccount'; payload: IGlobalState['account'] }
  | { type: 'setCreateChatVisible'; payload: IGlobalState['creatChatVisible'] }
  | { type: 'updateMsgScrollBottom'; payload: any }
  | { type: 'updateSendMsgShortcutKey'; payload: IGlobalState['sendMsgShortcutKey'] }

const initialState: IGlobalState = {
  isLogin: false,
  account: '',
  windowSize: 'normalSize',
  windowVisible: 'show',
  creatChatVisible: false,
  msgScrollBottom: 1,
  sendMsgShortcutKey: 'enter',
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
    case 'updateMsgScrollBottom':
      const msgScrollBottom = state.msgScrollBottom === 1 ? 2 : 1
      return { ...state, msgScrollBottom }
    case 'updateSendMsgShortcutKey':
      return { ...state, sendMsgShortcutKey: actions.payload }
    default:
      return state
  }
}
