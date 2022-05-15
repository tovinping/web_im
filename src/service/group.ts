import { createGroup, getGroupList } from 'src/api/server'
/**
 * 创建群组
 * @param groupName
 * @param memberList
 * @returns
 */
export async function handCreateGroup(groupName: string, memberList: string[]) {
  const owner = window.$state.global.account
  const { body, code } = await createGroup({ groupName, owner, memberList: [owner, ...memberList] })
  if (code === 0) {
    return body
  } else {
    return null
  }
}

export async function getGroupChange() {
  const { list, map } = window.$state.chat
  const groupIds: string[] = []
  list.forEach(chatId => {
    const chatInfo = map[chatId]
    if (chatInfo?.type === CHAT_TYPE.GROUP) {
      groupIds.push(chatId)
    }
  })
  if (groupIds.length < 1) return
  const { body, code } = await getGroupList(groupIds)
  if (code === 0) {
    const groupInfos: IGroup[] = []
    body?.forEach(item => {
      groupInfos.push(item)
    })
    window.$dispatch({ type: 'updateGroups', payload: groupInfos })
    return body
  } else {
    return []
  }
}
