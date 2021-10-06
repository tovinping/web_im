import React from 'react'
import { useRootState } from 'src/store'
import MsgItem from '../MsgItem'
import style from './index.module.scss'

export default function MsgList() {
  const message = useRootState(state => state.message)
  const currentChatId = useRootState(state => state.chat.current?.chatId)
  const msgList = message[currentChatId!] || []
  return (
    <div className={style.msgListWrap + ' scroll'}>
      {msgList.map(item => (
        <MsgItem key={item.id} {...item} />
      ))}
    </div>
  )
}
