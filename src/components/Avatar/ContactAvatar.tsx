import React from 'react'
import { useContactAvatar } from '../Hooks/avatar'
import BaseAvatar from './BaseAvatar'
interface IProps {
  account: string
}
export default function ContactAvatar({account}: IProps) {
  const contactUrl = useContactAvatar(account)
  return <BaseAvatar url={contactUrl} />
}