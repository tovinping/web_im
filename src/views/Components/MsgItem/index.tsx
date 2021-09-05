import React from 'react'
import classnames from 'classnames'
import { IMsg } from 'src/interface'
import { useRootState } from 'src/store'
import MsgText from '../MsgItemText'
import style from './index.module.scss'

export default function MsgItem(props: IMsg) {
  const myId = useRootState(state => state.global.account)
  const isMe = props.senderId === myId
  return (
    <div className={classnames(style.container, isMe && style.isMe)}>
      <div className={classnames(style.content, isMe && style.isMe)}>
        <MsgText {...props} />
      </div>
    </div>
  )
}
