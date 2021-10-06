import React from 'react'
import { useGroupAvatar } from '../Hooks/avatar'
import BaseAvatar from './BaseAvatar'
interface IProps {
  groupId: string
}
export default function GroupAvatar({groupId}: IProps) {
  const avatarUrl = useGroupAvatar(groupId)
  return <BaseAvatar url={avatarUrl} />
}