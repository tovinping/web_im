import { IGroupId } from 'src/typings/group'

type IMemberState = {
  map: Record<IGroupId, IMemberType[] | undefined>
}
type IUpdateMember = Partial<IMemberType> & Required<Pick<IMemberType, 'groupId'>>
type IAddMembers = Record<IGroupId, IMemberType[]>
type IRemoveMembers = Record<IGroupId, IUpdateMember[]>
type IUpdateMembers = Record<IGroupId, IUpdateMember[]>
type IMemberActions =
  | { type: 'addMembers'; payload: IAddMembers[] }
  | { type: 'removeMembers'; payload: IRemoveMembers[] }
  | { type: 'updateMembers'; payload: IUpdateMembers[] }

const initialState: IMemberState = {
  map: {},
}
export default function reducer(state = initialState, actions: IMemberActions): IMemberState {
  const { type, payload } = actions
  switch (type) {
    case 'addMembers': {
      const map = { ...state.map }
      payload.forEach(item => {
        const [[groupId, members]] = Object.entries(item)
        const oldMembers = map[groupId] || []
        map[groupId] = [...oldMembers, ...members]
      })
      return { ...state, map }
    }
    case 'removeMembers': {
      const map = { ...state.map }
      payload.forEach(item => {
        const [[groupId, members]] = Object.entries(item)
        const oldMembers = map[groupId] || []
        const removedMembers = oldMembers.filter(item => members.find(r => r.account === item.account))
        map[groupId] = removedMembers
      })
      return { ...state, map }
    }
    case 'updateMembers': {
      const map = { ...state.map }
      payload.forEach(item => {
        const [[groupId, members]] = Object.entries(item)
        const oldMembers = map[groupId] || []
        const updatedMembers = oldMembers.map(item => {
          const newInfo = members.find(m => m.account === item.account)
          return newInfo ? { ...item, ...newInfo } : item
        })
        map[groupId] = updatedMembers
      })
      return { ...state, map }
    }
    default:
      return state
  }
}
