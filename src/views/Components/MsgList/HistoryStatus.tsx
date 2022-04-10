import React from 'react'
import { CHAT_HISTORY_STATUS } from 'src/constant'
import { loadMoreHistory } from 'src/service'
import style from './HistoryStatus.module.scss'
interface IProps {
  chatId: string
  historyStatus?: CHAT_HISTORY_STATUS
}
export default function HistoryStatus({ chatId, historyStatus }: IProps) {
  if (!historyStatus) return null
  if (historyStatus === CHAT_HISTORY_STATUS.LOADING) return <div className={style.loading}>加载中...</div>
  if (historyStatus === CHAT_HISTORY_STATUS.NONE) return <div className={style.none}>历史消息已全部加载</div>
  return (
    <div className={style.normal} onClick={() => loadMoreHistory(chatId)}>
      加载更多
    </div>
  )
}
