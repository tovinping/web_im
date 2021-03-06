import React from 'react'
import { useRootState } from 'src/store'
import Icon from 'src/components/Icon'
import style from './index.module.scss'
export default function ChatInfo() {
  const currentId = useRootState(state => state.chat.currentChatId)
  const groupInfo = useRootState(state => state.group.map[currentId!])
  const userInfo = useRootState(state => state.user.map[currentId!])
  function handMore() {
    console.log('handMore...')
  }
  function handAddMember() {
    if (!groupInfo?.groupId) return
    const members = window.$state.member.map[groupInfo?.groupId]?.map(member => member.account)
    if (!members) return
  }
  return (
    <div className={style.chatInfo}>
      <div className={style.chatName}>{groupInfo?.name || userInfo?.name || ''}</div>
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
