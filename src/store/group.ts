type IGroupState = {
  map: Record<IGroupId, IGroup | undefined>
}
export type IUpdateGroup = Partial<IGroup> & Required<Pick<IGroup, 'groupId'>>
type IGroupActions =
  | { type: 'addGroups'; payload: IGroup[] }
  | { type: 'removeGroups'; payload: IGroupId[] }
  | { type: 'updateGroups'; payload: IUpdateGroup[] }

const initialState: IGroupState = {
  map: {},
}
export default function reducer(state = initialState, actions: IGroupActions): IGroupState {
  const { type, payload } = actions
  switch (type) {
    case 'addGroups': {
      const map = { ...state.map }
      payload.forEach(item => {
        map[item.groupId] = item
      })
      return { ...state, map }
    }
    case 'removeGroups': {
      const map = { ...state.map }
      payload.forEach(groupId => delete map[groupId])
      return { ...state, map }
    }
    case 'updateGroups': {
      const map = { ...state.map }
      payload.forEach(item => {
        const chatInfo = map[item.groupId]
        if (chatInfo) {
          map[item.groupId] = { ...chatInfo, ...item }
        }
      })
      return { ...state, map }
    }
    default:
      return state
  }
}
