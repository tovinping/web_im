import React from 'react'
import { Input } from 'antd'
import ICon from 'src/components/Icon'
import style from './Search.module.scss'
const logger = window.getLogger('Search')
export default function Search() {
  function handClickAddChat() {
    logger.info('handClickAddChat')
    window.$dispatch({ type: 'setCreateChatVisible', payload: true })
  }
  return (
    <div className={style.search}>
      <Input placeholder={'搜索最近会话和联系人'} />
      <ICon type={'Plus'} className={style.plus} onClick={handClickAddChat} />
    </div>
  )
}
