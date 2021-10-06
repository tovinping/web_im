import { getMemberList } from 'src/api/member'
import { IMemberInfo } from 'src/interface'

export async function handGetMemberList(groupId: string) {
  const { data, code } = await getMemberList(groupId)
  if (code === 0) {
    const members = sortMember(data!)
    window.$dispatch({ type: 'setMember', payload: { [groupId]: members } })
  }
}
export function sortMember(memberList: IMemberInfo[]) {
  const userMap = window.$state.user
  const managers: IMemberInfo[] = []
  const normals: IMemberInfo[] = []
  memberList.sort((a, b) => {
    const nameA = userMap[a.account]?.name || ''
    const nameB = userMap[b.account]?.name || ''
    return nameA.localeCompare(nameB)
  })
  memberList.forEach(item => {
    if (item.type === '1') {
      managers.push(item)
    } else {
      normals.push(item)
    }
  })
  return [...managers, ...normals]
}
