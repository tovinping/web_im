import {createGroup, getGroupList} from 'src/api'
import {IGroupState} from 'src/interface'
/**
 * 创建群组
 * @param groupName 
 * @param memberList 
 * @returns 
 */
export async function handCreateGroup(groupName: string, memberList: string[]) {
  const owner = window.$state.global.account
  const {data, code} = await createGroup({groupName, owner, memberList: [owner, ...memberList]})
  if (code === 0) {
    return data
  } else {
    return null
  }
}

export async function getGroupChange() {
  const conversationList = window.$state.conversation.list
  const groupIds: string[] = []
  conversationList.forEach(item => {
    if (item.type === '1'){
      groupIds.push(item.conversationId)
    }
  })
  if (groupIds.length < 1) return;
  const {data, code} = await getGroupList(groupIds)
  if (code === 0) {
    const groupMap: IGroupState = {}
    data?.forEach(item => {
      groupMap[item.groupId] = item
    })
    window.$dispatch({type: 'setGroup', payload: groupMap})
    return data
  } else {
    return []
  }
}