import React from 'react'
import { logout } from 'src/utils'
import style from './index.module.scss'

export default function Setting() {
  return (
    <ul className={style.setting}>
      <li>意见反馈</li>
      <li>个人设置</li>
      <li onClick={logout}>退出登录</li>
    </ul>
  )
}
