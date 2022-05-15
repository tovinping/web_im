import { getMemberList } from 'src/api/server'

export async function handGetMemberList(groupId: string) {
  const { body, code } = await getMemberList(groupId)
  if (code === 0) {
    const members = sortMember(body!)
    window.$dispatch({ type: 'addMembers', payload: [{ [groupId]: members }] })
  }
}
export function sortMember(memberList: IMember[]) {
  const userMap = window.$state.user.map
  const managers: IMember[] = []
  const normals: IMember[] = []
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
