import React, { useRef, useLayoutEffect } from 'react'
import { useRootState } from 'src/store'
import MsgItem from '../MsgItem'
import HistoryStatus from './HistoryStatus'
import useDebounce, { scrollBottom } from 'src/utils'
import style from './index.module.scss'
import { CHAT_HISTORY_STATUS, HISTORY_PAGE_SIZE } from 'src/constant'
export default function MsgList() {
  const listRef = useRef<HTMLDivElement>(null)
  const preMsgLenth = useRef(0)
  const currentId = useRootState(state => state.chat.currentChatId)
  const msgList = useRootState(state => state.msg.map[currentId]) || []
  const historyStatus = useRootState(state => state.chat.map[currentId]?.historyStatus)
  const hasMsgs = !!msgList.length
  // 切换会话保持滚动高度
  useLayoutEffect(() => {
    scrollBottom(listRef.current)
  }, [currentId])
  // 首次加载消息滚动到底部
  useLayoutEffect(() => {
    if (hasMsgs) {
      scrollBottom(listRef.current)
    }
  }, [hasMsgs])
  // 加载历史记录保持滚动高度
  useLayoutEffect(() => {
    if (historyStatus === CHAT_HISTORY_STATUS.LOADING) {
      preMsgLenth.current = msgList.length
      console.log('TANG==111', preMsgLenth.current)
    }
    if (historyStatus !== CHAT_HISTORY_STATUS.LOADING && msgList.length > HISTORY_PAGE_SIZE) {
      const index = msgList.length - preMsgLenth.current
      const preMsgEl = listRef.current?.children[index + 1]
      console.log('TANG==222', preMsgLenth.current, preMsgEl)
      // preMsgEl?.scrollTo({top: });
      preMsgEl?.scrollIntoView()
    }
  }, [historyStatus, msgList.length])
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
      <HistoryStatus historyStatus={historyStatus} chatId={currentId} />
      {msgList.map(item => (
        <MsgItem key={item.msgId} {...item} />
      ))}
    </div>
  )
}
