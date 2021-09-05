import React from 'react'
import { useRootState } from 'src/store'
import MsgItem from '../MsgItem'
import style from './index.module.scss'

export default function MsgList() {
  const message = useRootState(state => state.message)
  const currentConversationId = useRootState(state => state.conversation.current?.conversationId)
  const msgList = message[currentConversationId!] || []
  return (
    <div className={style.msgListWrap}>
      {msgList.map(item => (
        <MsgItem key={item.id} {...item} />
      ))}
    </div>
  )
}
