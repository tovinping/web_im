import React, {useRef, useEffect, useCallback} from 'react'
import { useRootState } from 'src/store'
import MsgItem from '../MsgItem'
import style from './index.module.scss'

export default function MsgList() {
  const listRef = useRef<HTMLDivElement>(null)
  const currentChatId = useRootState(state => state.chat.current?.chatId)
  const msgList = useRootState(state => state.message[currentChatId || '']) || []
  const goBottom = useCallback(() => {
    if(listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [])
  useEffect(()=> {
    goBottom()
  }, [goBottom, msgList.length])
  useEffect(() => {
    goBottom()
  }, [currentChatId, goBottom])
  return (
    <div className={style.msgListWrap + ' scroll'} ref={listRef}>
      {msgList.map(item => (
        <MsgItem key={item.id} {...item} />
      ))}
    </div>
  )
}
