import React from 'react'
import GroupAvatar from './GroupAvatar'
import ContactAvatar from './ContactAvatar'
type IProps = Pick<IChat, 'type' | 'chatId'>
export function ChatAvatar({ chatId, type }: IProps) {
  if (type === CHAT_TYPE.P2P) {
    return <ContactAvatar account={chatId} />
  } else {
    return <GroupAvatar groupId={chatId} />
  }
}
