import React, { useEffect } from 'react'
import { useRootState } from 'src/store'
import Item from './Item'
import Search from './Search'
import { getChatChange, getGroupChange } from 'src/utils'

export default function ChatList() {
  const chats = useRootState(state => state.chat.list)
  const isLogin = useRootState(state => state.global.isLogin)
  useEffect(() => {
    if (isLogin) {
      getChatChange().then(() => {
        getGroupChange()
      })
    }
  }, [isLogin])
  return (
    <div>
      <div>
        <Search />
      </div>
      {chats.map(item => (
        <Item key={item.chatId} {...item} />
      ))}
    </div>
  )
}
