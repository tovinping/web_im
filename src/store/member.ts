import { IMemberState, IMemberActions } from 'src/interface'
const initialState: IMemberState = {}
export default function reducer(state = initialState, actions: IMemberActions): IMemberState {
  switch (actions.type) {
    case 'setMember':
      return { ...state, ...actions.payload }
    case 'updateMember': {
      const { groupId, account } = actions.payload
      const newMembers = state[groupId]?.map(item => {
        if (item.account === account) {
          return { ...item, ...actions.payload }
        }
        return item
      })
      if (newMembers) {
        return { ...state, [groupId]: newMembers }
      } else {
        return state
      }
    }
    case 'removeMember': {
      const { accounts, groupId } = actions.payload
      const oldMembers = state[groupId]
      if (!oldMembers) return state
      const newMembers = oldMembers.filter(item => !accounts.includes(item.account))
      return { ...state, [groupId]: newMembers }
    }
    default:
      return state
  }
}
