import { IUserState, IUserActions } from 'src/interface'
const initialState: IUserState = {}
export default function reducer(state = initialState, actions: IUserActions): IUserState {
  switch (actions.type) {
    case 'setUser':
      return { ...state, ...actions.payload }
    case 'updateUser':
      return { ...state, [actions.payload.account]: actions.payload }
    default:
      return state
  }
}
