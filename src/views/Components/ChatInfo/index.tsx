import React from 'react'
import { useRootState } from 'src/store'
import Icon from 'src/components/Icon'
import style from './index.module.scss'
import { openContactSelect } from 'src/utils'
export default function ChatInfo() {
  const currentId = useRootState(state => state.chat.current?.chatId)
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
    })
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
