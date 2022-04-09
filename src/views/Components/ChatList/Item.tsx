import React from 'react'
import classnames from 'classnames'
import { useRootState } from 'src/store'
import { ChatAvatar } from 'src/components/Avatar'
import style from './Item.module.scss'
import { handChatClick } from 'src/service'
export default function ChatItem(props: Pick<IChatType, 'chatId'>) {
  const currentId = useRootState(state => state.chat.currentChatId)
  const chatInfo = useRootState(state => state.chat.map[props.chatId])
  const userInfo = useRootState(state => state.user.map[props.chatId])
  const groupInfo = useRootState(state => state.group.map[props.chatId])
  const chatName = userInfo?.name || groupInfo?.name
  const lastMsg = chatInfo?.lastMsg
  if (!chatInfo) return null
  function handleClick() {
    handChatClick(chatInfo!)
  }
  return (
    <div className={classnames(style.itemContainer, currentId === props.chatId && style.active)} onClick={handleClick}>
      <ChatAvatar chatId={props.chatId} type={chatInfo?.type} />
      <div className={style.extendInfo}>
        <div className={style.name} title={chatName}>
          {chatName || ''}
        </div>
        <div className={style.lastMsg} title={lastMsg?.content || ''}>
          {lastMsg?.content}
        </div>
      </div>
    </div>
  )
}
