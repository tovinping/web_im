import React, { useRef, useLayoutEffect } from 'react'
import { useRootState } from 'src/store'
import MsgItem from '../MsgItem'
import HistoryStatus from './HistoryStatus'
import useDebounce, { scrollBottom } from 'src/utils'
import style from './index.module.scss'

export default function MsgList() {
  const listRef = useRef<HTMLDivElement>(null)
  const currentId = useRootState(state => state.chat.currentChatId)
  const msgList = useRootState(state => state.msg.map[currentId]) || []
  useLayoutEffect(() => {
    scrollBottom(listRef.current)
  }, [currentId])
  const handScroll = useDebounce<React.UIEvent<HTMLDivElement>>(e => {
    if (!listRef.current) return
    const { scrollTop, scrollHeight, offsetHeight } = listRef.current
    // 触顶
    if (Math.floor(scrollTop) <= 0) {
      console.log('top')
    }
    // 触底
    if (Math.ceil(scrollTop) + offsetHeight >= scrollHeight) {
      console.log('bottom')
    }
  }, 100)
  return (
    <div className={style.msgListWrap + ' scroll'} ref={listRef} onScroll={handScroll}>
      <HistoryStatus chatId={currentId} />
      {msgList.map(item => (
        <MsgItem key={item.msgId} {...item} />
      ))}
    </div>
  )
}
