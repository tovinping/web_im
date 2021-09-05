import React from 'react'
import { useRootState } from 'src/store'
import Icon from 'src/components/Icon'
import style from './index.module.scss'
import { handGetMemberList, openContactSelect } from 'src/utils'
import { addMember } from 'src/api'
export default function ChatInfo() {
  const currentId = useRootState(state => state.conversation.current?.conversationId)
  const groupInfo = useRootState(state => state.group[currentId!])
  const userInfo = useRootState(state => state.user[currentId!])
  function handMore() {
    console.log('handMore...')
  }
  function handAddMember() {
    if (!groupInfo?.groupId) return
    const members = window.$state.member[groupInfo?.groupId]?.map(member => member.account)
    if (!members) return
    openContactSelect({
      selected: members,
      callback: async data => {
        console.log('handAddMember...', data)
        const accounts = data.map(d => d.account)
        if (accounts.length) {
          await addMember(accounts, groupInfo.groupId)
          handGetMemberList(groupInfo.groupId)
        }
      },
    })
  }
  return (
    <div className={style.chatInfo}>
      <div className={style.chatName}>{groupInfo?.name || userInfo?.chinesName || ''}</div>
      <ul className={style.chatOption}>
        <li className={style.chatOptionItem}>
          <Icon type={'Plus'} onClick={handAddMember} width={25} height={25} />
        </li>
        <li className={style.chatOptionItem}>
          <Icon type={'ThreeDots'} onClick={handMore} />
        </li>
      </ul>
    </div>
  )
}
