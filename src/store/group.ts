import { IGroupState, IGroupActions } from 'src/interface'
const initialState: IGroupState = {}
export default function reducer(state = initialState, actions: IGroupActions): IGroupState {
  switch (actions.type) {
    case 'setGroup':
      return { ...state, ...actions.payload }
    case 'updateGroup':
      const groupId = actions.payload.groupId
      const oldItem = state[groupId]
      if (oldItem && groupId){
        const newGroupInfo = {...oldItem, ...actions.payload}
        return {...state, [groupId]: newGroupInfo}
      } else {
        return state
      }
    default:
      return state
  }
}
