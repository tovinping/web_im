import React from 'react'
import { ChatAvatar } from 'src/components/Avatar'
import { CHAT_TYPE } from 'src/constant'
import style from './index.module.scss'
import { useRootState } from 'src/store'
export default function Layout(Com: () => JSX.Element) {
  return function LayoutWrap() {
    const myAccount = useRootState(state => state.global.account)
    return (
      <div className={style.layout}>
        <ul className={style.menu}>
          <li>
            <ChatAvatar type={CHAT_TYPE.P2P} chatId={myAccount} />
          </li>
          <li>消息</li>
          <li>通讯录</li>
          <li>收藏</li>
          <li>我的</li>
          <li>设置</li>
        </ul>
        <div className={style.body}>
          <Com />
        </div>
      </div>
    )
  }
}
