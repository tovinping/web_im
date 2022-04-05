import React, { useEffect } from 'react'
import { useRootState } from 'src/store'
import Item from './Item'
import Search from './Search'
import style from './index.module.scss'
import { getGroupChange, loadChatUsers } from 'src/utils'
import { loadServerChats } from 'src/service'

export default function ChatList() {
  const chats = useRootState(state => state.chat.list)
  const isLogin = useRootState(state => state.global.isLogin)
  useEffect(() => {
    if (isLogin) {
      getGroupChange()
      loadServerChats().then(() => loadChatUsers())
    }
  }, [isLogin])
  return (
    <div className={style.chatList}>
      <div>
        <Search />
      </div>
      {chats.map(chatId => (
        <Item key={chatId} chatId={chatId} />
      ))}
    </div>
  )
}
