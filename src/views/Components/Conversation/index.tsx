import React, { useEffect } from 'react'
import { useRootState } from 'src/store'
import Item from './Item'
import Search from './Search'
import { getConversationChange, getGroupChange } from 'src/utils'

export default function Conversation() {
  const conversations = useRootState(state => state.conversation.list)
  const isLogin = useRootState(state => state.global.isLogin)
  useEffect(() => {
    if (isLogin) {
      getConversationChange().then(() => {
        getGroupChange()
      })
    }
  }, [isLogin])
  return (
    <div>
      <div>
        <Search />
      </div>
      {conversations.map(item => (
        <Item key={item.conversationId} {...item} />
      ))}
    </div>
  )
}
