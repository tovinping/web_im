import React from 'react'
import { BaseAvatar } from 'src/components/Avatar'

import style from './index.module.scss'
export default function Personal() {
  return (
    <div className={style.personal}>
      <div className={style.baseInfo}>
        <ul>
          <li>测试一</li>
          <li>帐号: test1</li>
          <li>邮箱: tovinping@qq.com</li>
        </ul>
        <BaseAvatar size={'large'} />
      </div>
      <ul className={style.extends}>
        <li>备注: 开发者大大</li>
        <li>人性签名: 明天有事请假一天</li>
        <li>发送名片 发送消息</li>
      </ul>
    </div>
  )
}
