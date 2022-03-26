import { IUserAccount } from 'src/typings/user'
type IUserState = {
  map: Record<IUserAccount, IUserType | undefined>
}
export type IUpdateUser = Partial<IUserType> & Required<Pick<IUserType, 'account'>>
type IUserActions =
  | { type: 'addUsers'; payload: IUserType[] }
  | { type: 'removeUsers'; payload: IUserAccount[] }
  | { type: 'updateUsers'; payload: IUpdateUser[] }

const initialState: IUserState = {
  map: {},
}
export default function reducer(state = initialState, actions: IUserActions): IUserState {
  const { type, payload } = actions
  switch (type) {
    case 'addUsers': {
      const map = { ...state.map }
      payload.forEach(item => {
        map[item.account] = item
      })
      return { ...state, map }
    }
    case 'removeUsers': {
      const map = { ...state.map }
      payload.forEach(account => delete map[account])
      return { ...state, map }
    }
    case 'updateUsers': {
      const map = { ...state.map }
      payload.forEach(item => {
        const chatInfo = map[item.account]
        if (chatInfo) {
          map[item.account] = { ...chatInfo, ...item }
        }
      })
      return { ...state, map }
    }
    default:
      return state
  }
}
