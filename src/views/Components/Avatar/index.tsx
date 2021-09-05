import React from 'react'
import {IConversation} from 'src/interface'
import ContactAvatar, {ISize} from './ContactAvatar'
interface IProps {
  id: string;
  type: IConversation['type']
  size?: ISize
}
export default function Avatar({id, type, size}: IProps) {
  if (type === '1') {
    return <ContactAvatar size={size} />
  } else {
    return <ContactAvatar size={size} />
  }
}