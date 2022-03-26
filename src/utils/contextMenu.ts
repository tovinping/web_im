import { IBaseContextItem } from 'src/components/ContextMenu'
import { removeMember, updateAdmin } from 'src/api/server'
import { openOrCreateChat } from 'src/utils'
import { CHAT_TYPE, MEMBER_TYPE } from 'src/constant'
type IMemberContextItem = IBaseContextItem<IMemberType>
type IMemberFn = (m: IMemberType, l: IMemberContextItem[]) => void

export const buildSendMsg: IMemberFn = (member, list) => {
  list.push({
    key: 'sendMsg',
    name: '发送消息',
    cb() {
      const chat = openOrCreateChat(member.account, CHAT_TYPE.P2P)
      if (!chat) {
        console.error('创建会话失败')
      }
    },
  })
}
export const buildAt: IMemberFn = (member, list) => {
  list.push({
    key: 'at',
    name: '@TA',
    cb() {
      console.log('@TA', member)
    },
  })
}
export const buildManagerOpt: IMemberFn = (member, list) => {
  const groupId = member.groupId
  const groupInfo = window.$state.group.map[groupId]
  if (!groupInfo) return
  if (groupInfo.owner === member.account) return
  const name = member.type === '1' ? '取消管理员' : '设置管理员'
  list.push({
    key: 'memberType',
    name,
    cb() {
      const { groupId, type, account } = member
      const changedType = type === '1' ? MEMBER_TYPE.NORMAL : MEMBER_TYPE.ADMIN
      updateAdmin({ groupId, account, type: changedType }).then(res => {
        if (res.code === 0) {
          window.$dispatch({
            type: 'updateMembers',
            payload: [{ [groupId]: [{ account, type: changedType, groupId }] }],
          })
        }
      })
    },
  })
}
export const buildDelMember: IMemberFn = (member, list) => {
  const groupId = member.groupId
  const myAcc = window.$state.global.account
  const groupInfo = window.$state.group.map[groupId]
  if (!groupInfo) return
  if (groupInfo.owner === member.account) return
  const isOwner = groupInfo.owner === myAcc
  const selfMemberInfo = window.$state.member.map[groupId]?.find(m => m.account === myAcc)
  if (selfMemberInfo?.type === '1' && member.type === '1') return
  if (!isOwner && selfMemberInfo?.type === '0') return
  list.push({
    key: 'delMember',
    name: '移除成员',
    cb() {
      removeMember([member.account], groupId).then(() => {
        window.$dispatch({ type: 'removeMembers', payload: [{ [groupId]: [member] }] })
      })
    },
  })
}
export function buildMemberMenu(member: IMemberType): IMemberContextItem[] {
  const contextList: IMemberContextItem[] = []
  buildSendMsg(member, contextList)
  buildAt(member, contextList)
  buildManagerOpt(member, contextList)
  buildDelMember(member, contextList)
  return contextList
}
// 检查元素是否超出边界
interface ICheckBoundary {
  current: HTMLElement
  container?: HTMLElement
  x: number
  y: number
}
export function checkBoundary({ current, container, x, y }: ICheckBoundary) {
  container = container ?? document.body
  const ofw1 = current.offsetWidth
  const ofh1 = current.offsetHeight
  const ofl1 = x ?? current.offsetLeft
  const oft1 = y ?? current.offsetTop
  const ofw2 = container.offsetWidth
  const ofh2 = container.offsetHeight
  const obj = { x: false, y: false, value: '' }
  if (ofw2 - ofl1 < ofw1) {
    obj.x = true
    obj.value = ofw2 - ofl1 + 'px'
  } else if (ofh2 - oft1 < ofh1) {
    obj.y = true
    obj.value = ofh2 - oft1 + 'px'
  }
  return obj
}
