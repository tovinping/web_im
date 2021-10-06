import React from 'react'
import classnames from 'classnames'
import { useRootState } from 'src/store'
import { IConversation } from 'src/interface'
import Avatar from '../Avatar'
import style from './Item.module.scss'
export default function ConversationItem(props: IConversation) {
  const currentId = useRootState(state => state.conversation.current?.conversationId)
  const userInfo = useRootState(state => state.user[props.conversationId])
  const groupInfo = useRootState(state => state.group[props.conversationId])
  const conversationName = userInfo?.name || groupInfo?.name
  function handleClick() {
    window.$dispatch({ type: 'setCurrentConversation', payload: props })
  }
  return (
    <div className={classnames(style.itemContainer, currentId === props.conversationId && style.active)} onClick={handleClick}>
      <Avatar id={props.conversationId} type={props.type} />
      <div className={style.extendInfo}>
        <div className={style.name} title={conversationName}>
          {conversationName || ''}
        </div>
        {/* <div className={style.lastMsg} title={props.lastMsg || ''}>
          {props.lastMsg}
        </div> */}
      </div>
    </div>
  )
}
