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
  const {body, code} = await createGroup({groupName, owner, memberList: [owner, ...memberList]})
  if (code === 0) {
    return body
  } else {
    return null
  }
}

export async function getGroupChange() {
  const ChatList = window.$state.chat.list
  const groupIds: string[] = []
  ChatList.forEach(item => {
    if (item.type === '1'){
      groupIds.push(item.chatId)
    }
  })
  if (groupIds.length < 1) return;
  const {body, code} = await getGroupList(groupIds)
  if (code === 0) {
    const groupMap: IGroupState = {}
    body?.forEach(item => {
      groupMap[item.groupId] = item
    })
    window.$dispatch({type: 'setGroup', payload: groupMap})
    return body
  } else {
    return []
  }
}