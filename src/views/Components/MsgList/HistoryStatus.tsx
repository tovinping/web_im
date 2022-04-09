import React from 'react'
import { CHAT_HISTORY_STATUS } from 'src/constant'
import { loadMoreHistory } from 'src/service'
import { useRootState } from 'src/store'
import style from './HistoryStatus.module.scss'
interface IProps {
  chatId: string
}
export default function HistoryStatus({ chatId }: IProps) {
  const historyStatus = useRootState(state => state.chat.map[chatId]?.historyStatus)
  if (!historyStatus) return null
  if (historyStatus === CHAT_HISTORY_STATUS.LOADING) return <div className={style.loading}>加载中...</div>
  if (historyStatus === CHAT_HISTORY_STATUS.NONE) return <div className={style.none}>历史消息已全部加载</div>
  return (
    <div className={style.normal} onClick={() => loadMoreHistory(chatId)}>
      加载更多
    </div>
  )
}
