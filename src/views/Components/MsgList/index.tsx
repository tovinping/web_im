import React, { useRef, useLayoutEffect } from 'react'
import { useRootState } from 'src/store'
import MsgItem from '../MsgItem'
import HistoryStatus from './HistoryStatus'
import useDebounce, { scrollBottom } from 'src/utils'
import style from './index.module.scss'
import { CHAT_HISTORY_STATUS, HISTORY_PAGE_SIZE } from 'src/constant'
import { updateChatScrollTop } from 'src/service'
export default function MsgList() {
  const preScrollHeightRef = useRef<number>(0)
  const preScrollTopRef = useRef<number>(0)
  const listRef = useRef<HTMLDivElement>(null)
  const currentId = useRootState(state => state.chat.currentChatId)
  const currentScrollTop = useRootState(state => state.chat.map[currentId]?.scrollTop)
  const msgList = useRootState(state => state.msg.map[currentId]) || []
  const historyStatus = useRootState(state => state.chat.map[currentId]?.historyStatus)
  // 切换会话保持滚动高度
  useLayoutEffect(() => {
    if (!currentScrollTop) {
      scrollBottom(listRef.current)
    } else {
      listRef.current!.scrollTop = currentScrollTop
    }
    return () => {
      updateChatScrollTop(currentId, preScrollTopRef.current)
      preScrollTopRef.current = 0
    }
  }, [currentId, currentScrollTop])
  // 消息长度变化是否要自动滚动到底部
  useLayoutEffect(() => {
    const { scrollTop, scrollHeight, offsetHeight } = listRef.current!
    const diff = scrollHeight - offsetHeight - scrollTop
    // 滚动条距离底部200消息长度有变化自动跳至底部
    if (diff <= 200) {
      scrollBottom(listRef.current)
    }
    // 首次进入跳转至底部
    if (msgList.length <= HISTORY_PAGE_SIZE && !preScrollTopRef.current) {
      scrollBottom(listRef.current)
    }
  }, [msgList.length])
  // 加载历史记录保持滚动高度
  useLayoutEffect(() => {
    if (msgList.length <= HISTORY_PAGE_SIZE) return
    if (historyStatus === CHAT_HISTORY_STATUS.LOADING) {
      preScrollHeightRef.current = listRef.current!.scrollHeight
    }
    if (historyStatus !== CHAT_HISTORY_STATUS.LOADING) {
      const diff = listRef.current!.scrollHeight - preScrollHeightRef.current
      listRef.current?.scrollTo({ top: diff })
    }
  }, [historyStatus, msgList.length])
  const handScroll = useDebounce<React.UIEvent<HTMLDivElement>>(_ => {
    if (!listRef.current) return
    const { scrollTop, scrollHeight, offsetHeight } = listRef.current
    // 记录滚动位置
    preScrollTopRef.current = scrollTop
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
