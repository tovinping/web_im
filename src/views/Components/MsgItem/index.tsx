import React from 'react'
import classnames from 'classnames'
import { useRootState } from 'src/store'
import MsgText from '../MsgItemText'
import Sender from './Sender'
import style from './index.module.scss'

export default function MsgItem(props: IMsgType) {
  const myId = useRootState(state => state.global.account)
  const isMe = props.senderId === myId
  return (
    <div className={classnames(style.msgItem, isMe && style.isMe)}>
      <div className={style.container}>
        <div className={classnames(style.sender, isMe && style.isMe)}>
          <Sender senderId={props.senderId} />
        </div>
        <div className={classnames(style.content, isMe && style.isMe)}>
          <MsgText {...props} />
        </div>
      </div>
    </div>
  )
}
