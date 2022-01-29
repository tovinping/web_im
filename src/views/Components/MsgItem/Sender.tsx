import React from 'react'
import { BaseAvatar } from 'src/components/Avatar'
import { useRootState } from 'src/store'

export default function Sender({ senderId }: { senderId: string }) {
  const avatarUrl = useRootState(state => state.user[senderId]?.avatar)
  return <BaseAvatar url={avatarUrl} />
}
