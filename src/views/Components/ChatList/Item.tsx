import React from 'react'
import classnames from 'classnames'
import { useRootState } from 'src/store'
import { IChatExt } from 'src/interface'
import {ChatAvatar} from 'src/components/Avatar'
import style from './Item.module.scss'
export default function ChatItem(props: IChatExt) {
  const currentId = useRootState(state => state.chat.current?.chatId)
  const userInfo = useRootState(state => state.user[props.chatId])
  const groupInfo = useRootState(state => state.group[props.chatId])
  const chatName = userInfo?.name || groupInfo?.name
  function handleClick() {
    window.$dispatch({ type: 'setCurrentChat', payload: props })
  }
  return (
    <div className={classnames(style.itemContainer, currentId === props.chatId && style.active)} onClick={handleClick}>
      <ChatAvatar chatId={props.chatId} type={props.type} />
      <div className={style.extendInfo}>
        <div className={style.name} title={chatName}>
          {chatName || ''}
        </div>
        {/* <div className={style.lastMsg} title={props.lastMsg || ''}>
          {props.lastMsg}
        </div> */}
      </div>
    </div>
  )
}
