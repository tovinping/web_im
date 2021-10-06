import React from 'react'
import { Input } from 'antd'
import ICon from 'src/components/Icon'
import style from './Search.module.scss'
import { handClickAddChat } from 'src/utils'
export default function Search() {
  return (
    <div className={style.search}>
      <Input placeholder={'搜索最近会话和联系人'} />
      <ICon type={'Plus'} className={style.plus} onClick={handClickAddChat} />
    </div>
  )
}
