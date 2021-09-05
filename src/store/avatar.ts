import { IAvatarState, IAvatarActions } from 'src/interface'
const initialState: IAvatarState = {
}
export default function reducer(
  state = initialState,
  actions: IAvatarActions
): IAvatarState {
  switch (actions.type) {
    case 'setAvatar':
      return {...state, ...actions.payload}
    default:
      return state
  }
}
