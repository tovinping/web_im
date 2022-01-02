import React from 'react'
import { uploadFile } from 'src/api'
import { logout } from 'src/utils'
import style from './index.module.scss'

export default function Setting() {
  const fileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }
  return (
    <ul className={style.setting}>
      <li>意见反馈</li>
      <li>个人设置</li>
      <li onClick={logout}>退出登录</li>
      <li><input type="file" onChange={fileChange} /></li>
    </ul>
  )
}
